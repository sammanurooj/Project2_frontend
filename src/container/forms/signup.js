import * as React from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormUI from '../../layout/forms/signup';

export default function Signup() {
    const navigate = useNavigate();

    const [formValues, setFormValues] = React.useState({
        name: '',
        email: '',
        password: '',
        role: '',

    });

    const signUpMutation = useMutation(async ({ name, email, password, role }) => {
        const response = await axios.post('http://localhost:5000/api/users/signup', { name, email, password, role });
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

    return (

        <FormUI onSubmit={handleSubmit} formValues={formValues} handleInputChange={handleInputChange} />

    );
}
