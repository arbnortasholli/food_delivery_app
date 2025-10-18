import { ThemeProvider } from '../context/ThemeContext';
import { CartProvider } from '../context/CartContext';
import TabNavigator from '../navigation/TabNavigator';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
    return (
        <>
            <StatusBar style="auto" />
            <ThemeProvider>
                <CartProvider>
                    <TabNavigator />
                </CartProvider>
            </ThemeProvider>
        </>
    );
}