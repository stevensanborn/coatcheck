"use client";

import { useState } from "react";


export default function CreateSubscription({ coatCheckId }: { coatCheckId: string }) {


    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name, price, duration);

        const subscription = await fetch(`/api/protected/coatcheck/${coatCheckId}/subscription/create`, {
            method: 'POST',
            body: JSON.stringify({ name, price, duration }),
        });

        console.log(subscription);
    }

    return <div className="flex flex-col gap-4 p-6 max-w-md mx-auto card">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Subscription</h1>
        <p className="text-gray-600 mb-4">Create a new subscription for the coat check</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">  
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Subscription Name
            </label>
            <input 
                id="name"
                type="text" 
                name="name" 
                placeholder="Name" 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="price" className="text-sm font-medium text-gray-700">
                Price (in cents)
            </label>
            <input 
                id="price"
                type="number" 
                name="price" 
                placeholder="Price" 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />
            <label htmlFor="duration" className="text-sm font-medium text-gray-700">
                Duration (in days)
            </label>
            <input 
                id="duration"
                type="number" 
                name="duration" 
                placeholder="Duration" 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
            />
        
            <button 
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
                Create
            </button>
        </form>
    </div>;
}