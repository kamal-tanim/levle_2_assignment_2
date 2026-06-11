# Vehicle Rental System

## Project Overview

The Vehicle Rental System is a robust backend application developed to streamline and automate vehicle rental operations. The system provides a secure and efficient platform for managing vehicles, customers, and rental bookings while ensuring data integrity through role-based access control and authentication mechanisms.

The application supports two user roles: Administrator and Customer. Administrators are responsible for overseeing the entire system, including vehicle inventory, user management, and booking operations. Customers can browse available vehicles, create rental bookings, and manage their personal rental activities.

The system is designed following a modular architecture, promoting scalability, maintainability, and clean separation of responsibilities across different functional modules.

## Core Features

### Authentication and Authorization

The system implements secure authentication using JSON Web Tokens (JWT) and password encryption through bcrypt. User credentials are securely stored, and access to protected resources is controlled through role-based authorization.

The authorization system ensures that users can only perform actions permitted by their assigned roles, thereby enhancing security and protecting sensitive data.

### Vehicle Management

The vehicle management module enables administrators to maintain the vehicle inventory. Administrators can add new vehicles, update vehicle information, modify rental pricing, monitor availability status, and remove vehicles when appropriate.

Each vehicle record contains essential information, including vehicle name, category, registration number, daily rental rate, and current availability status.

### User Management

The user management module provides administrators with comprehensive control over user accounts. Administrators can view all registered users, update user information, manage user roles, and remove accounts when necessary.

Customers are permitted to update their own profile information while remaining restricted from accessing or modifying other users' data.

### Booking Management

The booking module serves as the core business component of the system. Customers can create vehicle rental bookings by selecting available vehicles and specifying rental periods.

Before a booking is confirmed, the system validates vehicle availability, verifies rental dates, and calculates the total rental cost based on the selected vehicle's daily rental rate and rental duration.

The system automatically updates vehicle availability when a booking is created, cancelled, or completed, ensuring accurate inventory tracking at all times.

### Automated Rental Lifecycle Management

To maintain operational efficiency, the system includes automated booking status management. Once a rental period expires, the system automatically updates the booking status to "Returned" and restores the corresponding vehicle's availability status.

This automation minimizes manual intervention and ensures that vehicle availability information remains accurate and up to date.

## Database Design

The application utilizes a relational database structure consisting of three primary entities:

### Users

The Users entity stores account information for both administrators and customers, including personal details, authentication credentials, and assigned roles.

### Vehicles

The Vehicles entity maintains information related to the vehicle inventory, including vehicle specifications, registration details, rental pricing, and availability status.

### Bookings

The Bookings entity records all rental transactions and serves as the relationship between customers and vehicles. Each booking contains rental dates, booking status, and calculated rental costs.

Together, these entities establish a structured and normalized database design that supports efficient data management and business operations.

## Business Rules and Constraints

The system enforces several business rules to ensure consistency and reliability:

* Each user account must be associated with a unique email address.
* Each vehicle must have a unique registration number.
* Passwords must meet minimum security requirements.
* Rental end dates must occur after rental start dates.
* Vehicles marked as booked cannot be rented by another customer.
* Vehicles with active bookings cannot be deleted.
* Users with active bookings cannot be removed from the system.
* Customers may only access and manage their own bookings.
* Customers may only modify their personal profile information.
* Administrative users possess full system-level privileges.

## Technology Stack

The application is built using modern backend technologies and development practices:

* Node.js
* TypeScript
* Express.js
* PostgreSQL
* JSON Web Token (JWT)
* bcrypt
* Zod
* node-cron

## Conclusion

The Vehicle Rental System delivers a secure, scalable, and efficient solution for managing vehicle rental operations. Through its modular architecture, role-based security model, automated booking management, and structured database design, the system provides a reliable platform capable of supporting real-world vehicle rental business requirements while maintaining high standards of performance, maintainability, and security.
