import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Earnings from "./Earnings";
import CarListingScreen from "./CarListingScreen";
import CarListDetailsScreen from "./CarListDetailsScreen";
import CarDetailListingScreen from "./CarDetailListingScreen";
import CarDetailScreen from "./CarDetailsScreen";
import CarInList from "./CarInList";
import Editcar from "./Editcar";

const Stack = createNativeStackNavigator();

export default function EarningsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="EarningsMain" component={Earnings} />
            <Stack.Screen name="CarListingScreen" component={CarListingScreen} />

            {/* STEP 1 — ID Proof */}
            <Stack.Screen name="CarListDetailsScreen" component={CarListDetailsScreen} />

            {/* STEP 2 — Upload Car Images */}
            <Stack.Screen name="CarDetailListingScreen" component={CarDetailListingScreen} />

            {/* STEP 3 — Final Car Details */}
            <Stack.Screen name="CarDetailScreen" component={CarDetailScreen} />

            <Stack.Screen name="CarInList" component={CarInList} />
            <Stack.Screen name="Editcar" component={Editcar} />
        </Stack.Navigator>

    );
}
