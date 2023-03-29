import { Button, Box, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { updateEducationForm } from '../../../../features/freelanceProfileForms';
import { useAppDispatch } from '../../../../store/hooks';

const EducationForm = ({ tab, key, index, deleteEducation }) => {
	
	const dispatch = useAppDispatch();
	const [education, setEducation] = useState(tab);

	const handleFormChange = (data, index) => {
		const { name, value } = data;
		setEducation({ ...education, [name]: value });
	};
	
	const updateEducation = () => {
		dispatch(updateEducationForm({ education, index }));
	};

	return (education &&
		<>
			<Box
				sx={{ mb: 5 }}
				key={key}
				onBlur={() => updateEducation()}
			>
				<Grid container spacing={5}>
					{index !== 0 && <Grid item xs={12}>
						<Box sx={{ borderBottom: '10px solid #f9f9f9' }}></Box>
					</Grid>}
					<Grid item xs={11} container spacing={5}>
						<Grid item xs={6}>
							<TextField
								name="title"
								label="Title"
								fullWidth
								value={education.title}
								onChange={(e) => (handleFormChange(e.target, index))}
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								fullWidth
								label="Start Date"
								type="date"
								name="startDate"
								value={education.startDate}
								onChange={(e) => (handleFormChange(e.target, index))}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								fullWidth
								label="End Date"
								type="date"
								name="endDate"
								value={education.endDate}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(e) => (handleFormChange(e.target, index))}
							/>
						</Grid>
					</Grid>
					<Grid item xs={1}>
						<Button color="secondary" className="default" value={index} onClick={() => deleteEducation(index)}>
							<DeleteIcon sx={{ pointerEvents: 'none' }} />
						</Button>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}
export default EducationForm