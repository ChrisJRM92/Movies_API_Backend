const app = require('./app');
const sequelize = require('./utils/connection');

const PORT = process.env.PORT;
const IPLOCAL = process.env.IPV4

const main = async () => {
    try {
        sequelize.sync({}); //alter: true force:true
        app.listen(PORT);
        console.log(`Server running on port ${PORT}`);
        console.log(`Link ${IPLOCAL}:${PORT}`);
    } catch (error) {
        console.log(error)
    }
}

main();