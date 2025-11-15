import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { MedicationCard } from '../../components/MedicationCard';
import { useMedications } from '../../hooks/useMedications';
import { Medication } from '../../types';

const MOCK_USER_ID = 'mock-user-id';

export function HomeScreen() {
  const { medications, isLoading, error, refetch } = useMedications(MOCK_USER_ID);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // Mock today's medications - replace with actual logic
  const todaysMedications = medications.slice(0, 3); // Placeholder

  const handleLogMedication = (medication: Medication) => {
    // TODO: Implement medication logging
    console.log('Log medication:', medication.name);
  };

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-destructive text-center mb-4">
          Error loading data: {error}
        </Text>
        <Button onPress={() => refetch()}>Retry</Button>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-4">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-foreground mb-2">
            Good morning! 👋
          </Text>
          <Text className="text-muted-foreground">
            Stay on track with your medications today
          </Text>
        </View>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="text-3xl font-bold text-streak-flame">
              0 🔥
            </Text>
            <Text className="text-muted-foreground mt-1">
              days in a row
            </Text>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Today's Medications</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Text className="text-muted-foreground">Loading...</Text>
            ) : todaysMedications.length > 0 ? (
              todaysMedications.map((medication) => (
                <MedicationCard
                  key={medication.id}
                  medication={medication}
                  onPress={() => console.log('Edit medication:', medication.name)}
                  onLogTaken={() => handleLogMedication(medication)}
                  status="upcoming"
                />
              ))
            ) : (
              <View className="items-center py-8">
                <Text className="text-muted-foreground mb-4 text-center">
                  No medications scheduled for today
                </Text>
                <Button>Add Medication</Button>
              </View>
            )}
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
