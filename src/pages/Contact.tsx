import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import conf from '../config/Conf';
import ReCAPTCHA from 'react-google-recaptcha'; 


export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) {
      setStatus('Syntax Error: Form not found. Have you tried compiling and running again?');
      setRecaptchaValue(null);
      return;
    }

    if (!recaptchaValue) {
      setStatus('Please complete the reCAPTCHA challenge before submitting.');
      setRecaptchaValue(null);
      return;
    }

    emailjs
      .sendForm(
        conf.emailJsServiceId,  
        conf.emailJsTemplateId,
        formRef.current,         
        conf.emailJsPublicKey    
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setStatus('Woohoo! Your message has been teleported to my inbox!');
          if (formRef.current) {
            formRef.current.reset();
            setRecaptchaValue(null);
          }
        },
        (error) => {
          console.error('Error sending email:', error.text);
          setStatus('Uh-oh! Looks like your message got stuck in a digital traffic jam. Try again?');
          setRecaptchaValue(null);
        }
      );
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 font-inconsolata">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Contact Me (If You Dare!)</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8 max-w-prose">
        Got a burning question? A million-dollar idea? I'm all ears! Unless I'm wearing noise-canceling headphones, in which case, I'm all eyes.
      </p>
      <div className="w-full max-w-md">
        <form
          ref={formRef}
          className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-300 dark:border-gray-700 p-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
              Your Superhero Name
            </label>
            <input
            required
              className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
              name='from_name'
              id='from_name'
              type="text"
              placeholder="Captain Awesome"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Your Top-Secret Email
            </label>
            <input
            required
              className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
              name='from_email'
              id='from_email'
              type="email"
              placeholder="definitely.not.a.bot@human.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="message">
              Your Mind-Blowing Message
            </label>
            <textarea
            required
              className="shadow appearance-none border border-gray-300 dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
              name='message'
              id='message'
              rows={4}
              placeholder="Got an idea that could make cats the new overlords? Share it here..."
            ></textarea>
          </div>
          <ReCAPTCHA
            sitekey={conf.recaptchaSiteKey}
            onChange={handleRecaptchaChange}
          />
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-300"
              type="submit"
            >
              Launch Message into Cyberspace!
            </button>
          </div>
          {status && <p className="mt-4 text-center text-red-500 dark:text-red-400">{status}</p>}
        </form>
      </div>
    </div>
  );
}