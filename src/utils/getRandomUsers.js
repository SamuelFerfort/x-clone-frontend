const getRandomUsers = (users, count = 6) => {
    const shuffled = [...users];

    //  Fisher-Yates Shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements i and j
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return the first 'count' users
    return shuffled.slice(0, count);
  };


  export default getRandomUsers