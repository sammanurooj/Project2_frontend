import * as React from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormUI from '../../layout/forms/signin';
import { Card, CardContent } from '@mui/material';

export default function SignIn() {
    const navigate = useNavigate();

    const signInMutation = useMutation(async ({ email, password }) => {
        const response = await axios.post('http://localhost:5000/api/users/signin', { email, password });
        console.log('this is data', response.data);

        return response.data;
    });

    const handleSubmit = async ({ email, password }) => {
        try {
            const response = await signInMutation.mutateAsync({ email, password });
            console.log("hello", response);
            localStorage.setItem('token', response.token);

            navigate("/");
        } catch (error) {
            throw new Error('Invalid email and password');
        }
    };

    return (
        <Card>
            <CardContent>
                <FormUI onSubmit={handleSubmit} />
            </CardContent>
        </Card>
    );
}
