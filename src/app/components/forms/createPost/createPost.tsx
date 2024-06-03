'use client'

import { useState } from 'react';
import { postData } from './index';
import { NextResponse } from "next/server";


export default function CreatePostForm({}){
    
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [isActive, setIsActive] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState<string>("");

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await postData({title, description, location, isActive, isPrivate});
            console.log('Post created successfully:', result);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }
        

    return (
        <form onSubmit={handleSubmit}>
            <label>TITLE
                <input 
                type="string"
                value={title}
                onChange={(e) => {setTitle(e.target.value)}}
                >
                </input>
            </label>

            <label>Description
                <input 
                type="string"
                value={description}
                onChange={(e) => {setDescription(e.target.value)}}
                >
                </input>
            </label>

            <button type="submit">Submit</button>
        </form>
    )
}