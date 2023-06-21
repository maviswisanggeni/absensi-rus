export const statistikDummyData = {
    data: {
        mingguan: [
            { date: "2023-05-16", count: getRandomCount() },
            { date: "2023-05-17", count: getRandomCount() },
            { date: "2023-05-18", count: getRandomCount() },
            { date: "2023-05-19", count: getRandomCount() },
            { date: "2023-05-20", count: getRandomCount() },
            { date: "2023-05-21", count: getRandomCount() },
            { date: "2023-05-22", count: getRandomCount() },
        ],
        bulanan: [
            { date: "Januari", count: getRandomCountMonth() },
            { date: "Februari", count: getRandomCountMonth() },
            { date: "Maret", count: getRandomCountMonth() },
            { date: "April", count: getRandomCountMonth() },
            { date: "Mei", count: getRandomCountMonth() },
            { date: "Juni", count: getRandomCountMonth() },
            { date: "Juli", count: getRandomCountMonth() },
            { date: "Agustus", count: getRandomCountMonth() },
            { date: "September", count: getRandomCountMonth() },
            { date: "Oktober", count: getRandomCountMonth() },
            { date: "November", count: getRandomCountMonth() },
            { date: "Desember", count: getRandomCountMonth() },
        ],
    },
};

function getRandomCount() {
    return Math.floor(Math.random() * 101) + 206;
}

function getRandomCountMonth() {
    return Math.floor(Math.random() * (4000 - 3600 + 1)) + 3600;
}