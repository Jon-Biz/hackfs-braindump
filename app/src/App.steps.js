import { render, screen } from '@testing-library/react';
import App from './App';
import { defineFeature, loadFeature } from 'jest-cucumber'
import '@testing-library/jest-dom';

const feature = loadFeature('./src/features/test.feature')

defineFeature(feature, test => {

})
