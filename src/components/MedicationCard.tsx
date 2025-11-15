import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Medication } from '../types';

interface MedicationCardProps {
  medication: Medication;
  onPress?: () => void;
  onLogTaken?: () => void;
  status?: 'upcoming' | 'taken' | 'missed' | 'late';
}

export function MedicationCard({
  medication,
  onPress,
  onLogTaken,
  status = 'upcoming',
}: MedicationCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'taken':
        return 'text-success';
      case 'missed':
        return 'text-destructive';
      case 'late':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'taken':
        return <Badge variant="default" className="bg-success">Taken</Badge>;
      case 'missed':
        return <Badge variant="destructive">Missed</Badge>;
      case 'late':
        return <Badge variant="default" className="bg-warning">Late</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="mb-3">
      <CardContent>
        <TouchableOpacity onPress={onPress} className="flex-row justify-between items-center">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: medication.color }}
              />
              <Text className="text-lg font-semibold text-foreground">
                {medication.name}
              </Text>
            </View>

            <Text className="text-base text-muted-foreground mb-1">
              {medication.dosage}
            </Text>

            {medication.notes && (
              <Text className="text-sm text-muted-foreground mb-2">
                {medication.notes}
              </Text>
            )}

            {getStatusBadge()}
          </View>

          {status === 'upcoming' && onLogTaken && (
            <Button size="sm" onPress={onLogTaken}>
              Take
            </Button>
          )}
        </TouchableOpacity>
      </CardContent>
    </Card>
  );
}
