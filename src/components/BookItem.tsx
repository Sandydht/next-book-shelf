'use client'

import Image from 'next/image';
import React from 'react';

interface ComponentProps {
  id: string;
  title: string;
  author: string;
  year: string;
  isbn: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function BookItem({ id, title, author, year, isbn, onDelete, onEdit }: ComponentProps) {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-[24px] p-[25px] border-[1px] border-gray-400 rounded-[8px] bg-white">
      <div className="w-full h-auto flex flex-col items-start justify-start gap-[8px]">
        <div className='w-full h-auto'>
          <p className='text-left text-[16px] leading-[24px] text-black font-bold'>
            {title || '-'}
          </p>
        </div>
        <ul className='w-full h-auto flex flex-col items-start justify-start list-disc pl-[15px]'>
          <li className='text-left text-[14px] leading-[20px] text-black font-semibold'>
            Author: <span className='font-normal'>{author || '-'}</span>
          </li>
          <li className='text-left text-[14px] leading-[20px] text-black font-semibold'>
            Year: <span className='font-normal'>{year || '-'}</span>
          </li>
          <li className='text-left text-[14px] leading-[20px] text-black font-semibold'>
            ISBN: <span className='font-normal'>{isbn || '-'}</span>
          </li>
        </ul>
      </div>
      <div className="w-full h-auto flex items-center justify-end gap-[10px]">
        <button
          type="button"
          className='cursor-pointer'
          onClick={() => onEdit(id)}
        >
          <Image
            src={"/mode_24px_outlined.svg"}
            alt='Edit icon'
            width={24}
            height={24}
          />
        </button>
        <button
          type="button"
          className='cursor-pointer'
          onClick={() => onDelete(id)}
        >
          <Image
            src={"/delete_24px_outlined.svg"}
            alt='Delete icon'
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  )
}