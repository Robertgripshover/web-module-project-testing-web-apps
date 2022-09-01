import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';





test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />)
    const headerElement = screen.queryByText(/contact form/i)//those lines instead of quotes make so it is not sensitive to case, you have to put the little i too
    expect(headerElement).toBeInTheDocument()
    expect(headerElement).toBeTruthy()
    expect(headerElement).toHaveTextContent(/contact form/i)

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstNameField = screen.getByLabelText(/First Name*/i)
    userEvent.type(firstNameField, "123")//this is making the test put these three numbers in the input
    const errorMessages = await screen.findAllByTestId("error")//seeing if it renders only 1 error message, so I need to make sure I am just getting the first name one
    expect(errorMessages).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const submitButton = screen.getByRole("button")
    userEvent.click(submitButton)
    await waitFor(() => {
        const errorMessages = screen.queryAllByTestId("error")
        expect(errorMessages).toHaveLength(3)
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstNameField = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameField, "Robert")//here what we are doing is first selecting the label, then typing Robert in the feild to see if it works if it has more than 5 charaters    

    const  lastNameField = screen.getByLabelText(/last name*/i)
    userEvent.type(lastNameField, "Gripshover")

    const button = screen.getByRole("button")
    userEvent.click(button)//making the button and using a userEvent to click it

    const errorMessages = await screen.findAllByTestId('error')
    expect(errorMessages).toHaveLength(1)

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const emailField = screen.getByLabelText(/email*/i)
    userEvent.type(emailField, "Bobby@gmail")
    const errorMessage = await screen.findByText(/email must be a valid email address/i)

});

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

// });

// test('renders all fields text when all fields are submitted.', async () => {

// });
