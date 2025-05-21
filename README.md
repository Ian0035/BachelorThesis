# CFA course providers comparison tool

## Topic of the Work
With the increasing number of online CFA (Chartered Financial Analyst) course providers, it becomes difficult for prospective candidates to choose the provider that best suits their learning needs and budget. This application was developed to help users make informed decisions through a utility-based comparison tool.

The web application allows users to compare CFA course providers based on criteria such as content quality, practise rescources, flexibility and accessibility, student support and Cost-effectiveness. Users can also read and submit reviews to contribute to a transparent comparison ecosystem.

The front end of the application is built with Next.js and styled using TailwindCSS, while Supabase serves as the backend for database management and user authentication. Web scraping with Puppeteer is used to fetch real-time certification data, available only to admin users. The overall result is a responsive, modern, and intuitive tool for navigating the CFA course market.

The scoring system is based on a utility analysis. Users can adjust the weight of each evaluation criterion according to their preferences. Providers are then ranked according to the user’s priorities, giving personalized recommendations backed by clear data and visual explanations.


## Run Locally
To run the application on your local machine, follow these steps:

1. ```git clone https://github.com/Ian0035/BachelorThesis```
2. Download node.js (Version > 18)
3. ```npm install```
4. ```npm run dev```-> The project will be accessible at http://localhost:3000.
5.⚠️ The application requires database credentials that are not included in this repository. If you are interested in running the full version with Supabase integration, please contact me at:
ian.hoogstrate@students.bfh.ch or check the written bachelor thesis for the credentials.
