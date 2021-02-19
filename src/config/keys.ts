
export default {
    mongoURI: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kziub.mongodb.net/Python-Autograder-KMUTT?retryWrites=true&w=majority`,
    secretOrKey: `${process.env.SECRET}`,
}

