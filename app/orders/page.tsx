"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Truck, CheckCircle, Clock, Eye } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"

const mockOrders = [
  {
    id: "TS123456",
    date: "2024-01-15",
    status: "delivered",
    total: 2299.99,
    items: [{ name: "Gaming Desktop RTX 4080", quantity: 1, price: 2299.99 }],
  },
  {
    id: "TS123457",
    date: "2024-01-10",
    status: "shipped",
    total: 1699.99,
    items: [{ name: 'iMac 24" M3', quantity: 1, price: 1699.99 }],
  },
  {
    id: "TS123458",
    date: "2024-01-05",
    status: "processing",
    total: 278.0,
    items: [
      { name: "Keychron K8 Pro", quantity: 1, price: 179.0 },
      { name: "Logitech MX Master 3S", quantity: 1, price: 99.0 },
    ],
  },
]

const statusConfig = {
  processing: { icon: Clock, color: "bg-yellow-500", text: "İşlənir" },
  shipped: { icon: Truck, color: "bg-blue-500", text: "Göndərildi" },
  delivered: { icon: CheckCircle, color: "bg-green-500", text: "Çatdırıldı" },
}

export default function OrdersPage() {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Sifarişlərim</h1>
        <p className="text-muted-foreground text-lg">Sifarişlərinizin statusunu izləyin</p>
      </motion.div>

      <div className="space-y-6">
        {mockOrders.map((order, index) => {
          const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
          const statusColor = statusConfig[order.status as keyof typeof statusConfig].color
          const statusText = statusConfig[order.status as keyof typeof statusConfig].text

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Package className="mr-2 h-5 w-5" />
                        Sifariş #{order.id}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tarix: {new Date(order.date).toLocaleDateString("az-AZ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={`${statusColor} text-white mb-2`}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusText}
                      </Badge>
                      <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Miqdar: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Təfərrüatlar
                      </Button>
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm">
                          Yenidən Sifariş Et
                        </Button>
                      )}
                    </div>
                    {order.status === "shipped" && (
                      <Button size="sm">
                        <Truck className="mr-2 h-4 w-4" />
                        İzlə
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {mockOrders.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Hələ sifariş yoxdur</h2>
          <p className="text-muted-foreground mb-6">İlk sifarişinizi vermək üçün məhsullara baxın</p>
          <Button>Məhsullara Bax</Button>
        </motion.div>
      )}
    </motion.div>
  )
}
