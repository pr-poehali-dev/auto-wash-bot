import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type TabType = 'booking' | 'queue' | 'locations';

interface CarWash {
  id: number;
  name: string;
  address: string;
  queue: number;
  maxQueue: number;
  waitTime: number;
  promo?: string;
  discount?: number;
  rating: number;
  services: string[];
}

const carWashes: CarWash[] = [
  {
    id: 1,
    name: 'АвтоБлеск Премиум',
    address: 'ул. Ленина, 45',
    queue: 3,
    maxQueue: 8,
    waitTime: 25,
    promo: 'WASH20',
    discount: 20,
    rating: 4.8,
    services: ['Экспресс-мойка', 'Премиум', 'Химчистка']
  },
  {
    id: 2,
    name: 'СуперМойка 24/7',
    address: 'пр. Победы, 12',
    queue: 7,
    maxQueue: 8,
    waitTime: 45,
    rating: 4.5,
    services: ['Экспресс-мойка', 'Полировка', 'Воск']
  },
  {
    id: 3,
    name: 'Чистый Автомобиль',
    address: 'ул. Мира, 88',
    queue: 1,
    maxQueue: 8,
    waitTime: 10,
    promo: 'FIRST30',
    discount: 30,
    rating: 4.9,
    services: ['Стандарт', 'Премиум', 'Детейлинг']
  },
  {
    id: 4,
    name: 'ЭкоМойка Плюс',
    address: 'ул. Садовая, 23',
    queue: 5,
    maxQueue: 8,
    waitTime: 35,
    rating: 4.6,
    services: ['Эко-мойка', 'Стандарт', 'Воск']
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('booking');
  const [selectedWash, setSelectedWash] = useState<number | null>(null);

  const getQueueStatus = (queue: number, maxQueue: number) => {
    const percentage = (queue / maxQueue) * 100;
    if (percentage < 40) return { label: 'Свободно', color: 'bg-green-500', textColor: 'text-green-400' };
    if (percentage < 70) return { label: 'Средняя загрузка', color: 'bg-yellow-500', textColor: 'text-yellow-400' };
    return { label: 'Почти заполнено', color: 'bg-red-500', textColor: 'text-red-400' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#1a1625] to-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Автомойка Онлайн
          </h1>
          <p className="text-muted-foreground text-lg">
            Запишитесь или выкупите очередь за пару кликов
          </p>
        </div>

        <div className="flex gap-3 mb-8 justify-center flex-wrap animate-scale-in">
          <Button
            onClick={() => setActiveTab('booking')}
            variant={activeTab === 'booking' ? 'default' : 'outline'}
            className="gap-2 text-base px-6 py-6 rounded-2xl transition-all hover:scale-105"
          >
            <Icon name="Calendar" size={20} />
            Запись
          </Button>
          <Button
            onClick={() => setActiveTab('queue')}
            variant={activeTab === 'queue' ? 'default' : 'outline'}
            className="gap-2 text-base px-6 py-6 rounded-2xl transition-all hover:scale-105"
          >
            <Icon name="Users" size={20} />
            Очередь
          </Button>
          <Button
            onClick={() => setActiveTab('locations')}
            variant={activeTab === 'locations' ? 'default' : 'outline'}
            className="gap-2 text-base px-6 py-6 rounded-2xl transition-all hover:scale-105"
          >
            <Icon name="MapPin" size={20} />
            Локации
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {carWashes.map((wash, index) => {
            const status = getQueueStatus(wash.queue, wash.maxQueue);
            const queuePercentage = (wash.queue / wash.maxQueue) * 100;
            
            return (
              <Card
                key={wash.id}
                className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary/50 transition-all cursor-pointer hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedWash(wash.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1 text-foreground">{wash.name}</h3>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Icon name="MapPin" size={16} />
                      {wash.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Star" size={18} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-foreground">{wash.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm font-semibold ${status.textColor}`}>
                      {status.label}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {wash.queue}/{wash.maxQueue} машин
                    </span>
                  </div>
                  <Progress value={queuePercentage} className="h-3" />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Clock" size={18} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Ожидание: <span className="text-foreground font-semibold">{wash.waitTime} мин</span>
                  </span>
                  {wash.queue > 0 && (
                    <div className="ml-auto">
                      <div className={`w-2 h-2 rounded-full ${status.color} animate-pulse-glow`} />
                    </div>
                  )}
                </div>

                {wash.promo && (
                  <div className="mb-4 p-3 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl border border-primary/30">
                    <div className="flex items-center gap-2">
                      <Icon name="Ticket" size={18} className="text-primary" />
                      <span className="text-sm font-semibold text-foreground">
                        Промокод: <span className="text-primary">{wash.promo}</span>
                      </span>
                      <Badge className="ml-auto bg-accent text-accent-foreground font-bold">
                        -{wash.discount}%
                      </Badge>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {wash.services.map((service) => (
                    <Badge key={service} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity font-semibold">
                    <Icon name="CalendarCheck" size={18} className="mr-2" />
                    Записаться
                  </Button>
                  {wash.queue > 0 && (
                    <Button variant="outline" className="flex-1 border-accent text-accent hover:bg-accent/10">
                      <Icon name="Zap" size={18} className="mr-2" />
                      Выкупить очередь
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {activeTab === 'queue' && (
          <Card className="mt-8 p-6 bg-card/50 backdrop-blur-sm border-2 border-border animate-scale-in">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Icon name="BarChart3" size={28} className="text-primary" />
              Статистика загруженности
            </h2>
            <div className="grid gap-4 md:grid-cols-4">
              {carWashes.map((wash) => {
                const status = getQueueStatus(wash.queue, wash.maxQueue);
                return (
                  <div key={wash.id} className="p-4 bg-muted/50 rounded-xl">
                    <div className="text-sm text-muted-foreground mb-2 truncate">{wash.name}</div>
                    <div className="text-3xl font-bold text-foreground mb-1">{wash.queue}</div>
                    <div className={`text-xs font-semibold ${status.textColor}`}>{status.label}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {activeTab === 'locations' && (
          <Card className="mt-8 p-6 bg-card/50 backdrop-blur-sm border-2 border-border animate-scale-in">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Map" size={28} className="text-primary" />
              Все автомойки города
            </h2>
            <div className="space-y-3">
              {carWashes.map((wash) => (
                <div key={wash.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl hover:bg-muted/70 transition-colors cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{wash.name}</div>
                    <div className="text-sm text-muted-foreground">{wash.address}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Очередь</div>
                    <div className="text-lg font-bold text-foreground">{wash.queue}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
