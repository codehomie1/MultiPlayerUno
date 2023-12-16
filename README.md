**Presentation Slides**
https://docs.google.com/presentation/d/1UyYIPCfwzPVKI09zPFeDuPKfUJRDLgw8d9lbMcDuVAg/edit?usp=sharing

**Live Website**

**Build instructions**

1. open terminal type: "npm i" to install dependencies
2. to start server type: "npm run start:dev"
3. open localhost:3000 in browser search bar

**Common psql cmds for reference**

- createdb: CREATE DATABASE testdb;
- delete table: drop tble <tblename>
- delete all records: delete from <tblename>
- list dbs : \l
- use db : \c <name_of_db>
- list tables : \dt

<p>if having trouble with migration try</p>
<ol>
    <li>delete all tables from db (especially pgmigrations)</li>
    <li>do db migrate</li>
</ol>
