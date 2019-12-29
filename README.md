# Node-React-BoilerPlate

Boilerplate for React, ContextApi, Express, Mysql2

# Config 

backend/.env
Change database info

# How To

***FrontEnd***

**Global Reducer**
Add your reducers to the gloable reducer in ```Store/appStore.js```:

```
alert: useReducer(alertReducer, alertInitState)
```

this way you can access ```alert``` from any component using Custom Hook (useUserStore()):

```
import { useUserStore } from "../Store/appStore";

const [{ auth }, dispatch] = useUserStore();

```

**PrivateRoute**

Protect your routes, so just logged users can access it:

```
<PrivateRoute auth={auth} exact path="/setting" component={Setting} />
```
it will check ```isAuthenticated, loading``` from the auth object, and depends  
on this two elements decide if user allowed to access this route or not.

***BackendEnd***

just a simple ```npm init -y```, the one addition is mysql2.
import ```pool``` from ```models/database.js`` to execute your queries.
```
const [result] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
```

# Set up

Here's the technical stack this boilerplate was made with:

# FrontEnd

- React
- ContextApi
- MaterialUi

# BackEnd

- Express
- MySql

# Usage

Run the following command withing the `backend` folder:

```
npm run dev
```
