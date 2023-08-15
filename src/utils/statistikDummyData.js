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
        ],
    },
};

for (let i = 0; i < 100; i++) {
    const randomDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const dateString = randomDate.toISOString().split("T")[0];
    statistikDummyData.data.bulanan.push({ date: dateString, count: getRandomCountMonth() });
}

function getRandomCount() {
    return Math.floor(Math.random() * 101) + 206;
}

function getRandomCountMonth() {
    return Math.floor(Math.random() * (4000 - 3600 + 1)) + 3600;
}