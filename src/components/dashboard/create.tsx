"use client"

import React, { useState } from 'react';
import { PublicKey, SystemProgram, Transaction, VersionedTransaction } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { getBasicProgram } from '@project/anchor';
import { useAnchorProvider } from '../solana/solana-provider';
import * as anchor from '@coral-xyz/anchor';
import { toast } from 'react-toastify';


import prisma from '../../libs/prisma';

export default function CreateCoatCheck( {setRenderIncrement,renderIncrement}: {setRenderIncrement: (renderIncrement: number) => void,renderIncrement: number} ) {
    // Add state for form fields
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    // Add state for validation messages
    const [nameError, setNameError] = useState("");
    const { publicKey , signTransaction} = useWallet();
    const provider = useAnchorProvider();
    const program = getBasicProgram(provider);
    
    const handleDBSubmit = async (name: string, description: string) => {
        console.log("handleDBSubmit", name, description);
        setStatus("submitting to db")
        
        //post to the api
        const response = await fetch("/api/protected/coatcheck/create", {
            method: "POST",
            body: JSON.stringify({ name, description }),
        });
        const data = await response.json();

        console.log("data", data);

        //reset the form  
        setName("");
        setDescription("");
        setStatus("Coat Checked Added");
        setRenderIncrement(renderIncrement + 1);
        return data;
    }

    const handleChainSubmit = async (name: string, description: string) => {
        setStatus("submitting on chain")
        if (!publicKey) {
            console.error("No public key found");
            return;
        }

        try {
            
            //get the address of the coat check
            const [coatCheck, bump] = await  PublicKey.findProgramAddressSync([anchor.utils.bytes.utf8.encode("COAT_CHECK"), publicKey!.toBuffer(), anchor.utils.bytes.utf8.encode(name)], program.programId);
       
            const tx = new Transaction();
            let strId = "A-123dfsjldksfj"
            const instructionInitialize = await program.methods.initialize(strId).accountsStrict({
                authority: publicKey,
                coatCheck: coatCheck,
                systemProgram:SystemProgram.programId,
            }).instruction();

            tx.add(instructionInitialize);
            
            const { blockhash, lastValidBlockHeight } = await provider.connection.getLatestBlockhash();
            tx.recentBlockhash = blockhash;
            tx.feePayer = publicKey!;
            
            const versionedTx = new VersionedTransaction(tx.compileMessage());
            const signedTx = await signTransaction!(versionedTx)
            
            console.log("signedTx", signedTx);
            
            const txId =await provider.connection.sendTransaction(signedTx);

            toast.success("Coat check created successfully "+txId,{position:"bottom-left"} );

    } catch (error) {
        console.error("Error initializing coat check", error);
    }
        



    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setStatus("submitting to form")
        e.preventDefault();
        let isValid = true;
        
        // Reset errors
        setNameError("");
        
        // Validate name
        if (name.trim().length < 3) {
            setNameError("Name must be at least 3 characters long");
            isValid = false;
        }
        
        if (isValid) {
            console.log("Form is valid, submitting...");
            // Add your submission logic here
            handleDBSubmit(name, description).then(coatCheck=>{
                console.log("coatCheck", coatCheck);
                // handleChainSubmit(name, description, coatCheck.id);
             });
            // await handleDBSubmit(name, description, coatCheck.id);
        }else{
            setStatus("form is not valid");
        }

    }
    
    return <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Create a new coat check</h1>
     <div>{status}</div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="flex flex-col gap-2">   
          <label htmlFor="name" className="font-medium text-gray-700">Name</label>
          <input 
            type="text" 
            placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-gray-100 transition-colors"
          />
          {nameError && <span className="text-red-500 text-sm">{nameError}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input 
            type="text" 
            placeholder="Description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-gray-100 transition-colors"
          />
        </div>
      
      
        <button type="submit" className="btn btn-primary btn-sm btn-outline">Create</button>
      </form>
    </div>
  }