import { environment } from "src/environments/environment"

export const apiUrl = environment.production ? 'https://glemmekassen-service.onrender.com' : 'http://localhost:8080'