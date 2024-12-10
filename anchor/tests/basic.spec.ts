import * as anchor from '@coral-xyz/anchor';
import { Program , BN} from '@coral-xyz/anchor';
import { Basic } from '../target/types/basic';
import {describe, it, expect} from '@jest/globals'
import { PublicKey } from '@solana/web3.js';

const COAT_CHECK_SEED = 'COAT_CHECK'

describe('basic', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Basic as Program<Basic>;

  const provider = anchor.AnchorProvider.env();
  // const connection = provider.connection;

  const user1 = anchor.web3.Keypair.generate();
  const authority1 = anchor.web3.Keypair.generate();


  it('initialize coat check', async () => {
    // Add your test here.
    
    await airdrop(provider.connection, authority1.publicKey);
    await airdrop(provider.connection, user1.publicKey);

    let name = '1-Test Coat Check'

    const [coatCheck, bump] = await  PublicKey.findProgramAddressSync([anchor.utils.bytes.utf8.encode("COAT_CHECK"),authority1.publicKey.toBuffer(), anchor.utils.bytes.utf8.encode(name)], program.programId);

    const tx = await program.methods.initialize(name).accountsStrict({
      authority: authority1.publicKey,
      coatCheck: coatCheck,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([authority1]).rpc();


    // console.log('tx', tx)

    const coatCheckAccount = await program.account.coatCheck.fetch(coatCheck);
    console.log('coatCheckAccount', coatCheckAccount)
    console.log(coatCheckAccount.strId)

    expect(coatCheckAccount.strId).toEqual(name)
    expect(coatCheckAccount.authority.toBase58()).toEqual(authority1.publicKey.toBase58())
    
    //INITIALIZE SUBSCRIPTION

    const nameSubscription = '1-Test Coat Check Subscription'

    const [coatCheckSubscription, bumpSubscription] = await  PublicKey.findProgramAddressSync([anchor.utils.bytes.utf8.encode("COAT_CHECK_SUBSCRIPTION"),authority1.publicKey.toBuffer(), anchor.utils.bytes.utf8.encode(nameSubscription)], program.programId);
    let price = new BN(10000)
    let duration = 86400

    const tx2 = await program.methods.initializeSubscription(nameSubscription, duration, price).accountsStrict({
      authority: authority1.publicKey,
      parent: coatCheck,
      coatCheckSubscription: coatCheckSubscription,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([authority1]).rpc();

    let coatCheckSubscriptionAccount = await program.account.coatCheckSubscription.fetch(coatCheckSubscription);
    console.log('coatCheckSubscriptionAccount', coatCheckSubscriptionAccount)

    expect(coatCheckSubscriptionAccount.strId).toEqual(nameSubscription)
    expect(coatCheckSubscriptionAccount.parentCoatCheck.toBase58()).toEqual(coatCheck.toBase58())
    expect(coatCheckSubscriptionAccount.duration).toEqual(duration)
    expect(coatCheckSubscriptionAccount.price.toNumber()).toEqual(price.toNumber())

     //INITIALIZE SUBSCRIPTION STATE
    const [coatCheckSubscriptionState, bumpSubscriptionState] = await  PublicKey.findProgramAddressSync([anchor.utils.bytes.utf8.encode("COAT_CHECK_SUBSCRIPTION_STATE"),user1.publicKey.toBuffer(), anchor.utils.bytes.utf8.encode(nameSubscription)], program.programId); 
    const tx3 = await program.methods.initializeSubscriptionState().accountsStrict({
      user: user1.publicKey,
      parentCoatCheck: coatCheck,
      parentSubscripton: coatCheckSubscription,
      coatCheckSubscriptionState: coatCheckSubscriptionState,
      subscriptionAuthority: authority1.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([user1]).rpc();

    let coatCheckSubscriptionStateAccount = await program.account.coatCheckSubscriptionState.fetch(coatCheckSubscriptionState);
    console.log('coatCheckSubscriptionStateAccount', coatCheckSubscriptionStateAccount)
    expect(coatCheckSubscriptionStateAccount.parentSubscription.toBase58()).toEqual(coatCheckSubscription.toBase58())
    
    //update subscription
    price = new BN(20000)
    duration = 172800
    console.log('updating subscription')
    const tx3b = await program.methods.updateSubscription(duration, price).accountsStrict({
      authority: authority1.publicKey,
      parent: coatCheck,
      coatCheckSubscription: coatCheckSubscription,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([authority1]).rpc({});

    
    coatCheckSubscriptionAccount = await program.account.coatCheckSubscription.fetch(coatCheckSubscription);
    console.log('coatCheckSubscriptionStateAccount updated', coatCheckSubscriptionAccount)
    expect(coatCheckSubscriptionAccount.duration).toEqual(duration)
    expect(coatCheckSubscriptionAccount.price.toNumber()).toEqual(price.toNumber())



    //BUY SUBSCRIPTION

    const tx4 = await program.methods.subscribe(duration, price).accountsStrict({
      user: user1.publicKey,
      parentCoatCheck: coatCheck,
      parentSubscripton: coatCheckSubscription,
      coatCheckSubscriptionState: coatCheckSubscriptionState,
      subscriptionAuthority: authority1.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([user1]).rpc();

    coatCheckSubscriptionStateAccount = await program.account.coatCheckSubscriptionState.fetch(coatCheckSubscriptionState);
    console.log('coatCheckSubscriptionStateAccount updated', coatCheckSubscriptionStateAccount)
    expect(coatCheckSubscriptionStateAccount.duration).toEqual(duration)
    expect(coatCheckSubscriptionStateAccount.price.toNumber()).toEqual(price.toNumber())

    //close coat check subscription state
    const tx5 = await program.methods.closeSubscriptionState().accountsStrict({
      authority: user1.publicKey,
      coatCheckSubscriptionState: coatCheckSubscriptionState,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([user1]).rpc();


    //close coat check subscription state
    const tx6 = await program.methods.closeSubscription().accountsStrict({
      authority: user1.publicKey,
      coatCheckSubscription: coatCheckSubscription,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([user1]).rpc();

    //close coat check
    const tx7 = await program.methods.closeCoatCheck().accountsStrict({
      authority: authority1.publicKey,
      coatCheck: coatCheck,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([authority1]).rpc();

  });
});


async function airdrop(connection: any, address: any, amount = 1000000000) {
  await connection.confirmTransaction(await connection.requestAirdrop(address, amount), "confirmed");
}
