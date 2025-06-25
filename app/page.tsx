'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/append-to-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert('Failed to submit');
    }
  };

  return (
    <main className="p-8">
      {/* <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="message"
          placeholder="Message"
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form> */}
      <div className='min-h-screen'>
        <Image
          src="/img-home-page.png" // Place your image in /public folder
          alt="Home Banner"
          width={690}
          height={680}
          className="object-contain absolute top-0 right-0"
        />
        <div className='max-w-10/12'>
          <div className='logo w-48 mb-24'>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full" width="200" zoomAndPan="magnify" viewBox="0 0 178.5 57.749997" height="77" preserveAspectRatio="xMidYMid meet" version="1.0">
              <defs><g></g><clipPath id="8cd4ac2768"><path d="M 9 13 L 26 13 L 26 42 L 9 42 Z M 9 13 " clipRule="nonzero"></path></clipPath><clipPath id="fbcd9c4d7a"><path d="M -5.285156 28.019531 L 17.421875 5.3125 L 41.710938 29.601562 L 19.003906 52.308594 Z M -5.285156 28.019531 " clipRule="nonzero"></path></clipPath><clipPath id="f7ab78fbe8"><path d="M -5.285156 28.019531 L 17.421875 5.3125 L 41.710938 29.601562 L 19.003906 52.308594 Z M -5.285156 28.019531 " clipRule="nonzero"></path></clipPath><clipPath id="17f9fd44fb"><path d="M 4 5 L 20 5 L 20 30 L 4 30 Z M 4 5 " clipRule="nonzero"></path></clipPath><clipPath id="af8d6af62c"><path d="M -5.285156 28.019531 L 17.421875 5.3125 L 41.710938 29.601562 L 19.003906 52.308594 Z M -5.285156 28.019531 " clipRule="nonzero"></path></clipPath><clipPath id="a8b6d89342"><path d="M -5.285156 28.019531 L 17.421875 5.3125 L 41.710938 29.601562 L 19.003906 52.308594 Z M -5.285156 28.019531 " clipRule="nonzero"></path></clipPath><clipPath id="1f87c8989a"><path d="M 0.535156 22.222656 L 17.582031 5.175781 L 25.328125 12.921875 L 8.28125 29.96875 Z M 0.535156 22.222656 " clipRule="nonzero"></path></clipPath><clipPath id="f011719805"><path d="M 0.535156 22.222656 L 17.546875 5.210938 L 25.292969 12.957031 L 8.28125 29.96875 Z M 0.535156 22.222656 " clipRule="nonzero"></path></clipPath><clipPath id="51a49e63cd"><path d="M 15 23 L 31 23 L 31 53 L 15 53 Z M 15 23 " clipRule="nonzero"></path></clipPath><clipPath id="d88f8b27b4"><path d="M -5.285156 28.019531 L 17.421875 5.3125 L 41.710938 29.601562 L 19.003906 52.308594 Z M -5.285156 28.019531 " clipRule="nonzero"></path></clipPath><clipPath id="473acc3905"><path d="M -5.285156 28.019531 L 17.421875 5.3125 L 41.710938 29.601562 L 19.003906 52.308594 Z M -5.285156 28.019531 " clipRule="nonzero"></path></clipPath><clipPath id="ea5178b934"><path d="M 9.554688 42.859375 L 29.480469 22.933594 L 38.925781 32.375 L 19 52.300781 Z M 9.554688 42.859375 " clipRule="nonzero"></path></clipPath><clipPath id="59a543e5c5"><path d="M 9.554688 42.859375 L 29.480469 22.933594 L 38.914062 32.363281 L 18.984375 52.289062 Z M 9.554688 42.859375 " clipRule="nonzero"></path></clipPath></defs><g clipPath="url(#8cd4ac2768)"><g clipPath="url(#fbcd9c4d7a)"><g clipPath="url(#f7ab78fbe8)"><path fill="#00609e" d="M 20.296875 25.886719 C 28.675781 19.414062 24.160156 13.988281 24.160156 13.988281 C 24.160156 13.988281 0.171875 31.0625 13.304688 41.261719 C 13.304688 41.261719 7.949219 35.421875 20.296875 25.886719 " fillOpacity="1" fillRule="nonzero"></path></g></g></g><g clipPath="url(#17f9fd44fb)"><g clipPath="url(#af8d6af62c)"><g clipPath="url(#a8b6d89342)"><g clipPath="url(#1f87c8989a)"><g clipPath="url(#f011719805)"><path fill="#36a5dd" d="M 14.546875 16.183594 C 21.855469 10.292969 17.972656 5.636719 17.972656 5.636719 C 17.972656 5.636719 -3.296875 20.773438 8.347656 29.816406 C 8.347656 29.816406 3.496094 25.097656 14.546875 16.183594 " fillOpacity="1" fillRule="nonzero"></path></g></g></g></g></g><g clipPath="url(#51a49e63cd)"><g clipPath="url(#d88f8b27b4)"><g clipPath="url(#473acc3905)"><g clipPath="url(#ea5178b934)"><g clipPath="url(#59a543e5c5)"><path fill="#1f396d" d="M 19.027344 52.246094 C 19.027344 52.246094 14.859375 45.316406 25.976562 35.917969 C 34.238281 28.933594 29.816406 23.28125 29.816406 23.28125 C 29.816406 23.28125 5.972656 41.414062 19.027344 52.246094 " fillOpacity="1" fillRule="nonzero"></path></g></g></g></g></g><g fill="#1f396d" fillOpacity="1"><g transform="translate(40.847714, 31.876137)"><g><path d="M 12.484375 -0.203125 C 9.390625 0.0664062 6.820312 0.203125 4.78125 0.203125 C 3.425781 0.203125 2.425781 -0.113281 1.78125 -0.75 C 1.144531 -1.382812 0.828125 -2.382812 0.828125 -3.75 L 0.828125 -10.40625 C 0.828125 -11.863281 1.15625 -12.921875 1.8125 -13.578125 C 2.476562 -14.234375 3.539062 -14.5625 5 -14.5625 L 12.484375 -14.5625 L 12.484375 -11.65625 L 5.828125 -11.65625 C 4.992188 -11.65625 4.578125 -11.238281 4.578125 -10.40625 L 4.578125 -3.75 C 4.578125 -3.425781 4.671875 -3.171875 4.859375 -2.984375 C 5.046875 -2.796875 5.285156 -2.703125 5.578125 -2.703125 C 5.867188 -2.703125 6.1875 -2.703125 6.53125 -2.703125 C 6.882812 -2.710938 7.242188 -2.722656 7.609375 -2.734375 C 7.984375 -2.753906 8.363281 -2.769531 8.75 -2.78125 C 9.132812 -2.800781 9.628906 -2.832031 10.234375 -2.875 C 10.835938 -2.914062 11.585938 -2.960938 12.484375 -3.015625 Z M 12.484375 -0.203125 "></path></g></g></g><g fill="#1f396d" fillOpacity="1"><g transform="translate(57.189431, 31.876137)"><g><path d="M 3.84375 0 L -0.203125 0 L 5.3125 -14.5625 L 9.46875 -14.5625 L 14.984375 0 L 10.921875 0 L 9.984375 -2.609375 L 4.78125 -2.609375 Z M 5.71875 -5.3125 L 9.046875 -5.3125 L 7.390625 -10.203125 Z M 5.71875 -5.3125 "></path></g></g></g><g fill="#1f396d" fillOpacity="1"><g transform="translate(75.404595, 31.876137)"><g><path d="M 1.25 -14.5625 L 9.984375 -14.5625 C 11.441406 -14.5625 12.5 -14.234375 13.15625 -13.578125 C 13.820312 -12.921875 14.15625 -11.863281 14.15625 -10.40625 L 14.15625 -8.53125 C 14.15625 -7.382812 13.960938 -6.488281 13.578125 -5.84375 C 13.203125 -5.207031 12.597656 -4.785156 11.765625 -4.578125 L 14.359375 0 L 10.296875 0 L 7.90625 -4.375 L 5 -4.375 L 5 0 L 1.25 0 Z M 10.40625 -10.40625 C 10.40625 -11.238281 9.988281 -11.65625 9.15625 -11.65625 L 5 -11.65625 L 5 -7.28125 L 9.15625 -7.28125 C 9.988281 -7.28125 10.40625 -7.695312 10.40625 -8.53125 Z M 10.40625 -10.40625 "></path></g></g></g><g fill="#1f396d" fillOpacity="1"><g transform="translate(93.827915, 31.876137)"><g><path d="M 12.796875 0 L 1.25 0 L 1.25 -14.5625 L 12.796875 -14.5625 L 12.796875 -11.65625 L 5 -11.65625 L 5 -8.84375 L 11.140625 -8.84375 L 11.140625 -5.9375 L 5 -5.9375 L 5 -2.90625 L 12.796875 -2.90625 Z M 12.796875 0 "></path></g></g></g><g fill="#1f396d" fillOpacity="1"><g transform="translate(110.481874, 31.876137)"><g><path d="M 0.8125 -3.015625 C 4.613281 -2.804688 7.1875 -2.703125 8.53125 -2.703125 C 8.851562 -2.703125 9.109375 -2.796875 9.296875 -2.984375 C 9.484375 -3.171875 9.578125 -3.425781 9.578125 -3.75 L 9.578125 -5.625 L 4.78125 -5.625 C 3.332031 -5.625 2.273438 -5.953125 1.609375 -6.609375 C 0.953125 -7.265625 0.625 -8.320312 0.625 -9.78125 L 0.625 -10.40625 C 0.625 -11.863281 0.953125 -12.921875 1.609375 -13.578125 C 2.273438 -14.234375 3.332031 -14.5625 4.78125 -14.5625 L 12.09375 -14.5625 L 12.09375 -11.65625 L 5.625 -11.65625 C 4.789062 -11.65625 4.375 -11.238281 4.375 -10.40625 L 4.375 -9.984375 C 4.375 -9.148438 4.789062 -8.734375 5.625 -8.734375 L 9.359375 -8.734375 C 10.722656 -8.734375 11.722656 -8.414062 12.359375 -7.78125 C 12.992188 -7.144531 13.3125 -6.144531 13.3125 -4.78125 L 13.3125 -3.75 C 13.3125 -2.382812 12.992188 -1.382812 12.359375 -0.75 C 11.722656 -0.113281 10.722656 0.203125 9.359375 0.203125 C 8.648438 0.203125 7.90625 0.191406 7.125 0.171875 L 5.203125 0.078125 C 3.785156 0.015625 2.320312 -0.078125 0.8125 -0.203125 Z M 0.8125 -3.015625 "></path></g></g></g><g fill="#1f396d" fillOpacity="1"><g transform="translate(127.86439, 31.876137)"><g><path d="M -0.421875 -14.5625 L 3.53125 -14.5625 L 6.96875 -7.5 L 10.40625 -14.5625 L 14.359375 -14.5625 L 8.84375 -3.84375 L 8.84375 0 L 5.09375 0 L 5.09375 -3.84375 Z M -0.421875 -14.5625 "></path></g></g></g><g fill="#1f396d" fillOpacity="1"><g transform="translate(145.246907, 31.876137)"><g><path d="M 13.9375 0 L 9.984375 0 L 5 -8.734375 L 5 0 L 1.25 0 L 1.25 -14.5625 L 5.203125 -14.5625 L 10.203125 -5.828125 L 10.203125 -14.5625 L 13.9375 -14.5625 Z M 13.9375 0 "></path></g></g></g><g fill="#1f396d" fillOpacity="1"><g transform="translate(163.878392, 31.876137)"><g><path d="M 12.484375 -0.203125 C 9.390625 0.0664062 6.820312 0.203125 4.78125 0.203125 C 3.425781 0.203125 2.425781 -0.113281 1.78125 -0.75 C 1.144531 -1.382812 0.828125 -2.382812 0.828125 -3.75 L 0.828125 -10.40625 C 0.828125 -11.863281 1.15625 -12.921875 1.8125 -13.578125 C 2.476562 -14.234375 3.539062 -14.5625 5 -14.5625 L 12.484375 -14.5625 L 12.484375 -11.65625 L 5.828125 -11.65625 C 4.992188 -11.65625 4.578125 -11.238281 4.578125 -10.40625 L 4.578125 -3.75 C 4.578125 -3.425781 4.671875 -3.171875 4.859375 -2.984375 C 5.046875 -2.796875 5.285156 -2.703125 5.578125 -2.703125 C 5.867188 -2.703125 6.1875 -2.703125 6.53125 -2.703125 C 6.882812 -2.710938 7.242188 -2.722656 7.609375 -2.734375 C 7.984375 -2.753906 8.363281 -2.769531 8.75 -2.78125 C 9.132812 -2.800781 9.628906 -2.832031 10.234375 -2.875 C 10.835938 -2.914062 11.585938 -2.960938 12.484375 -3.015625 Z M 12.484375 -0.203125 "></path></g></g></g><g fill="#36a5dd" fillOpacity="1"><g transform="translate(111.478325, 44.940806)"><g><path d="M 9 0 L 6.578125 0 L 6.578125 -3.828125 L 3.21875 -3.828125 L 3.21875 0 L 0.8125 0 L 0.8125 -9.390625 L 3.21875 -9.390625 L 3.21875 -5.703125 L 6.578125 -5.703125 L 6.578125 -9.390625 L 9 -9.390625 Z M 9 0 "></path></g></g></g><g fill="#36a5dd" fillOpacity="1"><g transform="translate(123.491281, 44.940806)"><g><path d="M 8.25 0 L 0.8125 0 L 0.8125 -9.390625 L 8.25 -9.390625 L 8.25 -7.515625 L 3.21875 -7.515625 L 3.21875 -5.703125 L 7.1875 -5.703125 L 7.1875 -3.828125 L 3.21875 -3.828125 L 3.21875 -1.875 L 8.25 -1.875 Z M 8.25 0 "></path></g></g></g><g fill="#36a5dd" fillOpacity="1"><g transform="translate(134.229126, 44.940806)"><g><path d="M 2.484375 0 L -0.140625 0 L 3.421875 -9.390625 L 6.109375 -9.390625 L 9.65625 0 L 7.046875 0 L 6.4375 -1.671875 L 3.09375 -1.671875 Z M 3.6875 -3.421875 L 5.84375 -3.421875 L 4.765625 -6.578125 Z M 3.6875 -3.421875 "></path></g></g></g><g fill="#36a5dd" fillOpacity="1"><g transform="translate(145.973649, 44.940806)"><g><path d="M 3.21875 -1.875 L 8.125 -1.875 L 8.125 0 L 0.8125 0 L 0.8125 -9.390625 L 3.21875 -9.390625 Z M 3.21875 -1.875 "></path></g></g></g><g fill="#36a5dd" fillOpacity="1"><g transform="translate(156.443043, 44.940806)"><g><path d="M 5.375 0 L 2.953125 0 L 2.953125 -7.515625 L 0.140625 -7.515625 L 0.140625 -9.390625 L 8.1875 -9.390625 L 8.1875 -7.515625 L 5.375 -7.515625 Z M 5.375 0 "></path></g></g></g><g fill="#36a5dd" fillOpacity="1"><g transform="translate(166.979546, 44.940806)"><g><path d="M 9 0 L 6.578125 0 L 6.578125 -3.828125 L 3.21875 -3.828125 L 3.21875 0 L 0.8125 0 L 0.8125 -9.390625 L 3.21875 -9.390625 L 3.21875 -5.703125 L 6.578125 -5.703125 L 6.578125 -9.390625 L 9 -9.390625 Z M 9 0 "></path></g></g></g>
            </svg>
          </div>
          <div className='relative z-10'>
            <h1 className='font-bold text-4xl mb-5 text-[#1f396d] max-w-2xl'>Welcome to CareSync Health Attendance System</h1>
            <div className='flex gap-3'>
              <Link className='bg-[#36a5dd] hover:bg-[#1f396d] transition-all text-white px-3 py-2 rounded' href="/login">Employee Login</Link>
              <Link className='border border-[#36a5dd] transition-all hover:bg-[#1f396d] text-[#1f396d] hover:text-white hover:border-[#1f396d] px-3 py-2 rounded' href="/admin/login">Admin Login</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
