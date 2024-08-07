# Personal Website Project

This project is for creating a personal website using React and Vite with TypeScript, styled with TailwindCSS. The website can be found at [sushantkhadka23.com.np](https://sushantkhadka23.com.np).

## Features

- **Authentication**: Admin login using Appwrite for authentication.
- **Content Management**: Storing pictures and details of blogs and projects using Appwrite.
- **Email Services**: Sending emails and messages using EmailJS.

## Technologies Used

- **Frontend**:

  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [TailwindCSS](https://tailwindcss.com/)

- **Backend**:
  - [Appwrite](https://appwrite.io/) for authentication and database.
  - [EmailJS](https://www.emailjs.com/) for email services.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/sushantkhadka23/personal_website.git
   cd personal_website
   2 . Install the dependencies:
   npm install
   3 . Set up environment variables:
   ☸ Create a .env file in the root directory.
   ☸ Add the necessary environment variables as shown in .env.example.
   ```
2. Run the development server:  
   npm run dev

Project Structure

      ☸ src: Contains all the source code.
          ☸ components: Reusable React components.
          ☸ pages: React components for different pages.
          ☸ services: Services for interacting with Appwrite and EmailJS.
          ☸ styles: TailwindCSS configuration and custom styles.
      ☸ public: Public assets including the favicon.

Configuration

     ☸  Appwrite:
        Configure Appwrite endpoint, project ID, database ID, and other related settings in the .env file.

     ☸ EmailJS:
        Configure EmailJS service ID, template ID, and public key in the .env file.

Deployment

This project is deployed using Vercel. Follow the Vercel deployment guides to deploy your own version of the project.
Usage

      ☸ Admin Login: Access the admin panel to manage blogs and projects.
      ☸ Contact Form: Send messages and inquiries via the contact form powered by EmailJS.

Contact

For any queries or issues, feel free to contact me at:

      ☸ Email: iamsushantkhadka754@gmail.com

License

This project is licensed under the MIT License. See the LICENSE file for details.
