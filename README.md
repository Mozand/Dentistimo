# Documentation

## Task Description and Purpose
We've developed a service that lets Gothenburg locals schedule dental visits. The user can be able to search for available times in user-defined time frames using a graphical user interface.


## Software Requirement Specification

### Functional Requirements
FR1. The system provides the local dental clinic on the map view<br />
FR2. The system should allow a patient creates an account.<br />
FR3. Each node component in the system should communicates through an MQTT broker.<br />
FR4. The system provides a patient location on a map overview.<br />
FR5. The system allows a patient to select a date and time to send appointment inquiry.<br />
FR6. After a user has selected an appointment slot, the system should send a message to confirm the booking.<br />
FR7. If the appointment cannot be confirmed, the system will inform the reason to patients.<br />
FR8. If an appointment slot is booked by a patient, the taken slot will be indicated so other patients can notice and updated simultaneously.<br />
FR9. The system allows a patient to change their profile information.<br />
FR10. The system allows a patient to cancel the confirmed booking.<br />
FR11. The system shall store the data of patients, appointments, and clinics in cloud DB.<br />
 
### Non-Functional Requirements
NFR 1. The system will be delivered in V1 in 20.Jan.<br />
NFR 2. The system only allows registered users to have access to the system by log in.<br />
NFR 3. The system will not fail when 5 users send a booking inquiry into the same clinic simultaneously.<br />
NFR 4. The system should be easy to use for user so new users make max 3 clicks mistake to make a new booking inquiry.<br />

## Software Architecture Document

### Forces
---

##### Availability

The System should be available with a high degree to clients to make appointments.

##### Extensibility

  Any new functionalities should be easy to implement.

##### Modularity

  The system should be divided into components by separation of concerns.

##### Maintainability

  The System should be easy to maintain and upgrade.

##### Modifiability

  Any changes to the system should be easy to implement.

##### Usability

  The client should be able to use the system easily.

##### Fault Tolerance

  The system should be available even during high demand.

##### Security

  The system should only be accessible by authorized users.

### Architectural Drivers
---

##### Modularity

To have a system that can be easily maintained and extensible, the different functionalities should be divided by separation of concern into components. Different components will handle different functionalities.

##### Maintainability

All functionalities should be clearly laid out in modules and easy to change.

##### Extensibility

Any new functionalities or components should be easy to integrate.

##### Usability

The user of the system should be able to easily navigate the application and easily be able to perform any specific task with only a few clicks.

### Architectural Styles
---
The System is designed with the following architectural styles:

##### Publish/Subscribe

The communication between components is handled by the MQTT protocol. Each component has a client publishing and subscribing to messages sent and received to the broker.

##### Pipe and Filter

The components process data which then is sent through the pipe to another component, which in it's turn do further processing.

##### Layered Architecture

From a top down perspective the components are layered. At the top we have the UI acting as the presentation layer. The UI sends or receives data from components in the business logic / persistence layer. Then as a third layer there is a database for storing data.

## Components

The System consists of five components:

##### The UI

  UI for getting and displaying data to the User.

##### The Clinic Manager

Clinic Manager retrieves and updates the dentist data in the Database.

##### The Booking Manager

The Booking Manager handles and checks incoming requests for appointments.

##### The Availability Checker

The Availability Checker retrieves the current appointments for a specific dentist from the Database for the UI. It also retrieves any appointments for a specific user and delete these from the database if demanded.

##### The User Manager

The User Manager handles registration of new users and the log in.

## Design Decisions

##### The UI

The User Interface will be browser based so that the system is platform independent.

##### The Database

The database will be implemented using MongoDB.

##### Components

At least four components will be created.

##### MQTT

The communication between components will be handled by the MQTT protocol.

## Design

### Functional Decomposition Digram

![Functional Decomposition Diagram](/Images/Functional_Decomposition_V2.png "Image Title")

### Component Diagram

![Component Diagram](/Images/Comp-v2.png "Image Title")

### Component Diagram 2

![Component Diagram](/Images/Component_V4.png "Image Title")


### Sequence Diagram Registration

![Sequence Diagram Registration](/Images/Project-seqeuence_registration_V1.png "Image Title")

### Sequence Diagram Login

![Sequence Diagram Login](/Images/SequenceLogin_V1.png "Image Title")

### Sequence Diagram Booking

![Sequence Diagram Booking](/Images/sequence_booking_V1.png "Image Title")

### Entity Relationship Diagram

![ER Diagram](/Images/ER_V1.png "Image Title")

### Class Diagram

![Class Diagram](/Images/ClassDiagram_V2.png "Image Title")

## Program Management Report
We're using scrum to manage our project, with the goal of weekly incremental releases. Every week, we assign a Scrum Master to ensure that the team stays on schedule.

### Practices

* SCRUM
* Kanban Style Board

### Schedule
* Monday - Daily Standup
* Tuesday - Daily Standup
* Wednesday - Daily Standup and Sprint Review
* Thursday - Daily Standup
* Friday - Daily Standup and Sprint Retrospective

