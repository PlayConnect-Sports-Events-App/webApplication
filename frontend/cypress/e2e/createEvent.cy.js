describe('Create Event Test', () => {
    before(() => {
        // Mock the login request and response
        cy.intercept('POST', '**/api/user/auth/authenticate', {
            statusCode: 200,
            body: {
                token: 'fake-jwt-token',
            },
        }).as('loginRequest');

        // Mock the event creation request and response
        cy.intercept('POST', '**/api/event', (req) => {
            req.reply({
                statusCode: 200,
                body: "fake-id", // Use a fixed fake ID for the event
            });
        }).as('createEventRequest');

        // Mock the request for getting the event by ID
        cy.intercept('GET', '**/api/event/fake-id', {
            statusCode: 200,
            body: {
                id: 2,
                title: 'Test Event',
                location: 'Test Location',
                sportType: 'football',
                maxParticipants: 10,
                eventDate: '2024-06-01',
                eventTime: '18:00',
                description: 'This is a test event.',
            },
        }).as('getEventRequest');

        // Ensure the app is running at the correct URL
        cy.visit('http://localhost:3000/');

        // Click on the "Sign In" link in the navbar
        cy.contains('Sign In').click();

        // Fill out the login form
        cy.get('input[type="email"]').type('luc@gmail.com'); // Replace with valid test email
        cy.get('input[type="password"]').type('1234'); // Replace with valid test password

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Wait for the login request to complete
        cy.wait('@loginRequest');

        // Ensure the user is redirected to the homepage after login
        cy.url().should('eq', 'http://localhost:3000/');
    });

    it('should navigate to create event page, fill the form, and create an event', () => {
        // Click on the "Events" link in the navbar
        cy.contains('Events').click();

        // Click on the "Create Event" link from the dropdown
        cy.contains('Create Event').click();

        // Verify that we are on the Create Event page
        cy.url().should('include', '/create');

        // Fill out the event creation form
        cy.get('input[placeholder="Enter title"]').type('Test Event');
        cy.get('input[placeholder="Enter location"]').type('Test Location');

        // Select the sport type, use the label or another reliable selector
        cy.get('select').select('football', { force: true });

        cy.get('input[placeholder="Enter free spots"]').type('10');
        cy.get('input[placeholder="Enter date"]').type('2024-06-01'); // Adjust the date format as needed
        cy.get('input[placeholder="Enter time"]').type('18:00'); // Adjust the time format as needed
        cy.get('textarea[placeholder="Enter description"]').type('This is a test event.');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Wait for the create event request to complete
        cy.wait('@createEventRequest');

        // Verify that the user is redirected to the newly created event's page
        cy.url().should('include', '/event/fake-id'); // Use the fixed fake ID for assertion
    });
});