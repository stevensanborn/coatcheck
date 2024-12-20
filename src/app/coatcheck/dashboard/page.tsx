"use client"

import CreateCoatCheck from "@/components/dashboard/create";
import prisma from "@/libs/prisma";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Dashboard() {
 const { publicKey } = useWallet();
 const [coatChecks, setCoatChecks] = useState([]);
 const [renderIncrement, setRenderIncrement] = useState(0);

 //get all coatchecks for a given authority

 const getCoatChecks =  useCallback(async () => {  
    const coatChecks = await fetch(`/api/protected/coatcheck/authority?publicKey=${publicKey?.toBase58()}`);
    const coatChecksJson = await coatChecks.json();
    console.log("coatChecks", coatChecksJson);
    return coatChecksJson;
 }, [publicKey,renderIncrement]);

 const handleEdit = (id: string) => {
  console.log("handleEdit", id);
 }

 const handleDelete = async (id: string) => {
  console.log("handleDelete", id);

    //delete from db
    try{
    const response = await fetch(`/api/protected/coatcheck/${id}/delete`);
    const data = await response.json();
    console.log("data", data);
    setRenderIncrement(renderIncrement + 1);
  } catch (error) {
    console.error("Error deleting coat check", error);
  }
 }

 useEffect(() => {
      getCoatChecks().then((coatChecks) => {
        
        setCoatChecks(coatChecks);
    });
 }, [getCoatChecks,renderIncrement]);


  return <div>

    <h1>Dashboard</h1>


    <section className="max-w-6xl mx-auto p-4">
      
      <h2 className="text-2xl font-bold mb-6">Your Coat Checks ({coatChecks.length}) </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      
        {coatChecks.map((coatCheck: any) => (
          
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <div className="mb-3">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                <Link 
                href={`/coatcheck/${coatCheck.id}`}
                key={coatCheck.id}
                className="block hover:transform hover:scale-105 transition-transform duration-200"
              > 
                {coatCheck.name}  
              </Link>
                </h3>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</label>
                <p className="text-gray-600 dark:text-gray-300">
                  {coatCheck.description}
                </p>
              </div>

              <div className="flex justify-end">
                
                  <button className="text-primary bg-neutral-dark p-2 hover:bg-neutral-hover rounded-md mr-2 my-2" onClick={()=>handleEdit(coatCheck.id)}>Edit</button>
                
                  <button className="text-primary bg-neutral-dark p-2 hover:bg-neutral-hover rounded-md my-2" onClick={()=>handleDelete(coatCheck.id)}>Delete</button>
              
              </div>
            </div>
          
        ))}
      </div>
      {coatChecks.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
          <p>No Coat Checks yet</p>
        </div>
      )}
    </section>

    <div className='flex justify-center'>
      <CreateCoatCheck  renderIncrement={renderIncrement} setRenderIncrement={setRenderIncrement} />
    </div>

  </div>
}