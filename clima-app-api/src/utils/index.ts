export const formatTemperature = (temperature: number): number => {
    const kelvin = 273.15;
    const celsius = temperature - kelvin;
    return Math.round(celsius * 100) / 100; // Redondear a dos decimales
}