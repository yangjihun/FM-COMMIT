import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Project from "../pages/Project";
import Study from "../pages/Study";
import Login from "../pages/Login";
import Week1 from '../pages/summer-semester/Week1';
import Week2 from '../pages/summer-semester/Week2';
import Week3 from '../pages/summer-semester/Week3';
import Week4 from '../pages/summer-semester/Week4';
import Week5 from '../pages/summer-semester/Week5';
import RegularStudy from "../pages/RegularStudy";
import PrivateRoute from '../components/PrivateRoute';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/study" element={
                <PrivateRoute>
                    <Study />
                </PrivateRoute>
            } />
            <Route path="/project" element={
                <PrivateRoute>
                    <Project />
                </PrivateRoute>
            } />
            <Route path="/regular-study" element={
                <PrivateRoute>
                    <RegularStudy />
                </PrivateRoute>
            } />
            <Route path="/study/week1" element={
                <PrivateRoute>
                    <Week1 />
                </PrivateRoute>
            } />
            <Route path="/study/week2" element={
                <PrivateRoute>
                    <Week2 />
                </PrivateRoute>
            } />
            <Route path="/study/week3" element={
                <PrivateRoute>
                    <Week3 />
                </PrivateRoute>
            } />
            <Route path="/study/week4" element={
                <PrivateRoute>
                    <Week4 />
                </PrivateRoute>
            } />
            <Route path="/study/week5" element={
                <PrivateRoute>
                    <Week5 />
                </PrivateRoute>
            } />
        </Routes>
    );
}

export default AppRouter;