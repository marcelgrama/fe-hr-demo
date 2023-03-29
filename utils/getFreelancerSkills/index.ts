
const getSkills = (skills: string) => {
    //replace characters like "/" ",""
    //then replacing double spaces with singles spaces
    //then split them into an array of skills
    const skillsArr = skills.replace(' ', '').split(',');

    return skillsArr.length > 0 ? skillsArr : [''];
};

export default getSkills;