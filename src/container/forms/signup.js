import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormUI from '../../layout/forms/signup';

export default function Signup() {
    const navigate = useNavigate();

    const [formValues, setFormValues] = React.useState({
        name: '',
        email: '',
        password: '',
        Location: '', // Adding location field to formValues
        role: '',
    });

    const signUpMutation = useMutation(async ({ name, email, password, Location, role }) => {
        const response = await axios.post('http://localhost:5000/api/users/signup', { name, email, password, Location, role });
        console.log('this is data', response.data);
        return response.data;
    });

    const handleSubmit = (values) => {
        signUpMutation.mutate(values);
    };

    React.useEffect(() => {
        if (signUpMutation.isSuccess) {
            // Show success popup
            alert('Successfully signed up');

            // Reset form fields
            setFormValues({
                name: '',
                email: '',
                password: '',
                Location: '',
                role: '',
            });

            navigate('/signin');
        }
    }, [signUpMutation.isSuccess, navigate]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Fetching location options from API endpoint using React Query
    const locationQuery = useQuery('userLocations', async () => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        };
        const response = await axios.get('http://localhost:5000/api/userlocation/userlocations', config);
        return response.data;
    });

    if (locationQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (locationQuery.isError) {
        return <div>Error fetching location options</div>;
    }

    const locationvalues = locationQuery.data;
  


    const locationOptions =
    locationvalues && Array.isArray(locationvalues.data.users.rows)
      ? locationvalues.data.users.rows.map((user) => ({
          id: user.id,
          location: user.location,
         
        }))
      : [];
 


    return (
        <FormUI
            onSubmit={handleSubmit}
            formValues={formValues}
            handleInputChange={handleInputChange}
            locationOptions={locationOptions} // Pass the location options to FormUI component
        />
    );
}
