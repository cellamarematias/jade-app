import { ScreensNavigation } from "./screens/Navigation/ScreensNavigation";

// Screens here
import Login from "./screens/Login";
import Home from "./screens/Home";
import Blog from "./screens/Blog";

// const Stack = createBottomTabNavigator();

// el orden de las pantallas se corresponden al orden en el que se muestran
// function MyStack() {
//   return (
//     <Stack.Navigator
//       sceneContainerStyle={styles.container}
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "Home") {
//             iconName = focused ? "home" : "home";
//           } else if (route.name === "Blog") {
//             iconName = focused ? "logo-bitcoin" : "logo-bitcoin";
//           } else if (route.name === "Market") {
//             iconName = focused ? "podium" : "podium";
//           } else if (route.name === "Settings") {
//             iconName = focused ? "settings-sharp" : "settings-sharp";
//           }

//           // You can return any component that you like here!
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "white",
//         tabBarInactiveTintColor: "#ABFB5C",
//         tabBarStyle: {
//           backgroundColor: "#32089A",
//           borderTopLeftRadius: 24,
//           borderTopRightRadius: 24,
//           borderColor: "#32089A",
//           borderStyle: "none",
//           marginTop: -40,
//         },
//       })}
//     >
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Blog" component={Blog} />
//       <Stack.Screen name="Login" component={Login} />
//     </Stack.Navigator>
//   );
// }

// A HACER:
// VER TEMA RENDERIZADO DE ICONOS EN TABBAR

export default function App() {
  return <ScreensNavigation />;
}
