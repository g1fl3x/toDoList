import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import 'antd/dist/antd.dark.css'
import App from './App';
import { Divider } from 'antd'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/static-pages/LoginPage";
import RegisterPage from './components/static-pages/RegisterPage'
import NotFoundPage from './components/static-pages/NotFoundPage'

ReactDOM.render(
	<React.StrictMode>
		<Divider>
			<h2>ToDo</h2>
		</Divider>
		<BrowserRouter>
			<Routes>
				<Route path='*' component={<NotFoundPage />} />
				<Route index element={<App />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
