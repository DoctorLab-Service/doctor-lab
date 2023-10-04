# AUTH TASK

## 16.09.23
### Задачи

- [x] - Reset form after sending a request.
- [x] - Reset form after click back or login page links.
- [x] - Reorganization reset transition

## 28.09.23
### Tasks

- [x] Reset the form after sending a request.
- [x] Remove the display of a 404 error when enabling Email Confirmation.
- [x] Remove the display of a 404 error when switching to Password Change.
- [x] During user creation, save the form data in Redux when transitioning to Phone Number Verification.
- [x] When returning from Verification to User Creation, load the form data from Redux.
- [x] Prevent access to Email Confirmation if there is no code in the URL and the confirmEmail.confirm parameter is not specified.
- [x] Implement a check for the presence of confirmEmail.confirm = true based on specified parameters in localStorage.

### localStorage Configuration

- [x] Configure localStorage settings with a 15-minute expiration:
    - [x] `sended` - Indicates the sending of a message with a code.
    - [x] `complited` - Indicates code confirmation, which redirects to password change, blocking access to the Email Confirmation page.
    - [x] `failed` - Indicates a code error, which blocks access to the Email Confirmation page after a page refresh and deletes localStorage.
    - [x] `finished` - Indicates confirmation of password change, which redirects to the Login page, deletes localStorage, and blocks access to the password change page.
