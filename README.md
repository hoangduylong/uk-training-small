# Universal Kinjirou Development Environment Initialization Guide. 

## Require
  - Oracle JDK: 1.8.
  - NodeJS: version 10 or above.
  - Eclipse Neon (Workwith JDK 1.8, include gradlew build tool).
  - Typescript version 3 or above.
  
## Optional:
  - node-sass (for build scss on base project)
  - Git Desktop (recommend cause simple and easy for use).
  - Git SCM (recommend).
  - Windows Terminal (recommend, Only on windows) as alternal Command software.
 
## First install.
  - Download JDK at here[https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html] and install it.
  - Download NodeJS at here[https://nodejs.org/en/download/] and install it.
  - Copy of Eclipse Neon (request to Kiban team).
  - Install typescript by command at Windows Terminal (after install NodeJS): `npm install -g typescript`.
  - Optional:
    + Install node-sass by command at Windows Terminal (after install NodeJS): `npm install -g node-sass`.
    + Download and install Git Desktop at here[https://desktop.github.com/] and install it.
    + Download and install Git SCM at here[https://git-scm.com/] and install it.
    + Download and install Windows Termial at here[https://aka.ms/terminal] and install it.
 
## Initial envinronment.
  - Run step by step:
    + Step 1: Initial default depends
      + Open Command (Windows Terminal) and go to com project folder.
      + Type `./gradlew initd` for initial depends of some project.
    + Redo Step 1 for other project: at, pr, hr.
    + Step 2: Build all project.
      + Go to com project folder.
      + Type `./gradlew upver` for update version of all project.
    + Redo Step 2 for other project: at, pr, hr.
    + Step 3: Build typescript.
      + Go to com project folder.
      + Type: `./gradlew tsc` for build typescript files.
    + Redo Step 3 for other project at, pr, hr.
    + Step 4: Initial eclipse project.
      + Go to com project folder.
      + Type `./gradlew eclipse` for initial project file of eclipse IDE.
    + Redo Step 4 for other project: base, at, pr, hr.
    + Step 5:
      + Import step by step all project to Eclipse by gradle build tool.

## Some common gradle task:
  - `./gradlew eclipse`: Initial Eclipse project for import to Eclipse IDE.
  - `./graldew initd`: Initial Default depends projects.
  - `./gradlew upver`: Update version of all sub projects in Universal K.
  - `./gradlew tsc`: Build typescript (use `tscw` for build and continue watch & build).
  - `./gradlew test`: Runs the unit tests.
  - `./gradlew war`:  Generates a war archive with all the compiled classes, the web-app content and the libraries.
  - `./gradlew task`: List all task of project.
  
## Only for mobile project:
  - First run:
    - Type `npm install` for install all depends libs & framework (require internet connection).
    - Type `npm run webpack:vendor` for build all vendor libs & framework.
    - Type `npm run webpack` for build app.
    - Type `npm run start:dev` for start server & continue watch & build app.
   - Read more from README.MD of mobile project.
