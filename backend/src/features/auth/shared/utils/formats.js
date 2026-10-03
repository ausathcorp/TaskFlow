export function capitalize(word){
    return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`
}

export function transformUserDocument(user){
    let { 
        _id: id, 
        __v,
        passwordHash, 
        ...data
    } = user;
    return { id, ...data }
}