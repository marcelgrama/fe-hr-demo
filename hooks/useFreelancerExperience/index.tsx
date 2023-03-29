import moment from 'moment';

const useFreelancerExperience = (freelancerExperience: any[]) => {
  let steps = [] as any[];
  freelancerExperience.forEach((experience) => {
    const { name, column_values } = experience;

    column_values && column_values.length>0 && steps.push({
      label: `${column_values[2].text} # ${moment(column_values[0].text).format(
        'MMMM YYYY'
      )} -${moment(column_values[1].text).format('MMMM YYYY')} (${name})`,
      description: column_values[3].text,
    });
  });

  return [steps];
};

export { useFreelancerExperience };
