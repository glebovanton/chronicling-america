<script lang="ts" setup>
</script>

<template>
    <div class="about-page flex w-4/5 mx-auto my-16 flex-col min-h-screen text-center text-gray-800 dark:text-gray-300">
        <h1 class="text-3xl font-semibold mb-6">About This Project</h1>
        <p class="mb-4">
            This application was created as part of a task to build a Vue.js 3 web app that interfaces with a backend
            using data from the Fortune 500 companies list. The goal of the project is to allow users to search for
            companies by title or stock market ticker and display relevant financial and company information in an
            intuitive interface.
        </p>
        <p class="mb-4">
            The dataset used in this project is the
            <a
                class="text-blue-500 underline"
                href="https://www.kaggle.com/datasets/jeannicolasduval/2024-fortune-1000-companies"
                target="_blank"
            >
                Fortune 1000 Companies Dataset
            </a>
            which provides information on the top companies in 2024, including
            details such as the CEO, industry, market cap, and profits. Users can search, view key company data,
            and navigate to a detailed view of any specific company.
        </p>
        <p class="mb-4">
            On the technical side, this project is built using Vue.js 3, TypeScript, and TailwindCSS for the front-end.
            The back-end is powered by a Node.js server with a SQL-based database that stores the companies' data.
            The application is designed to be scalable, capable of handling large datasets and multiple concurrent
            users.
        </p>
        <p class="mb-4">
            Key features of this project include search functionality, detailed views for each company, and error
            handling for failed data retrieval. The user experience is enhanced with responsive design, clean UI
            components, and seamless navigation between views.
        </p>
        <p class="font-semibold mt-8">This project demonstrates:</p>
        <ul class="list-disc list-inside mb-8">
            <li>Vue.js 3 and TypeScript proficiency</li>
            <li>Building reusable and modular components</li>
            <li>Cross-browser compatibility</li>
            <li>Scalability for handling large datasets and users</li>
            <li>Robust error handling and user feedback mechanisms</li>
        </ul>
        <p class="text-gray-600 dark:text-gray-400">
            For more information on how to set up and run the project, check the <strong>
                <a
                    class="text-blue-500 underline"
                    href="README.md"
                    target="_blank"
                >
                    README.md
                </a>
            </strong>
            in the repository.
        </p>
    </div>
</template>

<style scoped>

.about-page {
  font-family: 'Inter', sans-serif;
  @media (min-width: 1024px) {
      min-height: 100vh;
      display: flex;
      align-items: center;
  }
}
</style>

