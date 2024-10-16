const app = require('./app');
const sequelize = require('./utils/connection');

const PORT = process.env.PORT;

const main = async () => {
    try {
        sequelize.sync({}); //alter: true force:true
        app.listen(PORT);
        console.log(`Server running on port ${PORT}`);
        console.log(`Link http://localhost:${PORT}`);
    } catch (error) {
        console.log(error)
    }
}

main();