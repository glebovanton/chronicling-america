<template>
    <div
        class="not-found-page flex w-4/5 mx-auto my-16 flex-col min-h-screen text-center text-gray-800
    dark:text-gray-300"
    >
        <h1 class="text-3xl font-semibold mb-6">404 - Page Not Found</h1>
        <p class="mb-4">
            Sorry, the page you are looking for does not exist. It might have been removed, had its name changed, or
            is temporarily unavailable.
        </p>
        <p class="mb-4">
            You can return to the <RouterLink
                class="text-blue-500 underline"
                :to="{ name: 'Home' }"
            >Home</RouterLink> page or try searching for what you need.
        </p>
        <p class="mb-4">
            If you think this is a mistake, please check the URL or contact support.
        </p>
        <p class="font-semibold mt-8">What to do next:</p>
        <ul class="list-disc list-inside mb-8">
            <li>Check the URL for any typos</li>
            <li>Return to the home page and navigate from there</li>
            <li>Use the search function to find specific companies</li>
        </ul>
        <p class="text-gray-600 dark:text-gray-400">
            For further assistance, feel free to consult the <strong>
                <a
                    class="text-blue-500 underline"
                    href="README.md"
                    target="_blank"
                >README.md</a>
            </strong>
            in the repository.
        </p>
    </div>
</template>
