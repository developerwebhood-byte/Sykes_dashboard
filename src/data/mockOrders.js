export const mockOrders = [
    {
      id: '#ORD-2023-001',
      customer: { 
        name: 'Sarah Jenkins', 
        email: 'sarah.j@example.com', 
        avatar: 'https://i.pravatar.cc/100?img=5', 
        initials: 'SJ', 
        bg: 'bg-blue-500',
        phone: '+91 98765 43210',
        customerSince: 'Jan 2023',
        billingAddress: '123 Tech Park, Phase 2, HSR Layout, Sector 4, Bangalore, Karnataka 560102, India'
      },
      manual: 'Caterpillar 320D Excavator Service Manual',
      manualType: 'PDF Download',
      amount: 2499,
      status: 'Success',
      date: 'Oct 24, 2023',
      time: '14:30 PM',
      placedOn: 'Oct 24, 2023 at 14:30 PM',
      paymentMethod: 'Credit Card ending in 4242',
      paymentGateway: 'Stripe',
      items: [
        {
          id: 1,
          title: 'Caterpillar 320D Excavator Service Manual',
          category: 'Heavy Machinery',
          brand: 'Caterpillar',
          price: 2499.00,
          qty: 1,
          image: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&q=80&w=200'
        }
      ],
      timeline: [
        { status: 'Order Completed', description: 'Receipt email sent to customer.', time: 'Oct 24, 14:30 PM', color: 'bg-green-500' },
        { status: 'Payment Processed', description: 'Charge successful via Stripe (ch_1N...).', time: 'Oct 24, 14:29 PM', color: 'bg-blue-500' },
        { status: 'Order Created', description: 'Checkout initiated.', time: 'Oct 24, 14:25 PM', color: 'bg-gray-300' }
      ],
      fraudAnalysis: {
        risk: 'Low Risk',
        evaluation: 'Stripe Radar evaluation',
        checks: [
          { label: 'CVC match', passed: true },
          { label: 'Billing address match', passed: true },
          { label: 'IP address country matches', passed: true }
        ]
      }
    },
    {
      id: '#ORD-2023-002',
      customer: { 
        name: 'Michael Ross', 
        email: 'm.ross@construction.com', 
        initials: 'MR', 
        bg: 'bg-indigo-500',
        phone: '+1 234 567 8901',
        customerSince: 'Mar 2023',
        billingAddress: '456 Construction Way, New York, NY 10001, USA'
      },
      manual: 'John Deere 5055E Tractor Service Manual',
      manualType: 'PDF Download',
      amount: 1299,
      status: 'Pending',
      date: 'Oct 24, 2023',
      time: '11:15 AM',
      placedOn: 'Oct 24, 2023 at 11:15 AM',
      paymentMethod: 'PayPal - m.ross@example.com',
      paymentGateway: 'PayPal',
      items: [
        {
          id: 1,
          title: 'John Deere 5055E Tractor Service Manual',
          category: 'Agriculture',
          brand: 'John Deere',
          price: 1299.00,
          qty: 1,
          image: 'https://images.unsplash.com/photo-1594913785162-e673a6e9d6ef?auto=format&fit=crop&q=80&w=200'
        }
      ],
      timeline: [
        { status: 'Payment Pending', description: 'Awaiting PayPal confirmation.', time: 'Oct 24, 11:16 AM', color: 'bg-yellow-500' },
        { status: 'Order Created', description: 'Checkout initiated.', time: 'Oct 24, 11:15 AM', color: 'bg-gray-300' }
      ],
      fraudAnalysis: {
        risk: 'Low Risk',
        evaluation: 'System verification',
        checks: [
          { label: 'Identity verified', passed: true },
          { label: 'Payment history clean', passed: true }
        ]
      }
    },
    {
      id: '#ORD-2023-003',
      customer: { 
        name: 'David Chen', 
        email: 'david.c@techcorp.net', 
        avatar: 'https://i.pravatar.cc/100?img=12', 
        initials: 'DC', 
        bg: 'bg-teal-500',
        phone: '+86 10 1234 5678',
        customerSince: 'Jun 2022',
        billingAddress: '789 Tech Hub, Chaoyang District, Beijing, China'
      },
      manual: 'Komatsu PC200-8 Hydraulic Excavator',
      manualType: 'PDF + Video Guide',
      amount: 3999,
      status: 'Failed',
      date: 'Oct 23, 2023',
      time: '09:45 AM',
      placedOn: 'Oct 23, 2023 at 09:45 AM',
      paymentMethod: 'Credit Card ending in 9988',
      paymentGateway: 'Stripe',
      items: [
        {
          id: 1,
          title: 'Komatsu PC200-8 Hydraulic Excavator',
          category: 'Heavy Machinery',
          brand: 'Komatsu',
          price: 3999.00,
          qty: 1,
          image: 'https://images.unsplash.com/photo-1579456542735-4929871f307a?auto=format&fit=crop&q=80&w=200'
        }
      ],
      timeline: [
        { status: 'Payment Failed', description: 'Insufficient funds / Declined by bank.', time: 'Oct 23, 09:46 AM', color: 'bg-red-500' },
        { status: 'Order Created', description: 'Checkout initiated.', time: 'Oct 23, 09:45 AM', color: 'bg-gray-300' }
      ],
      fraudAnalysis: {
        risk: 'Medium Risk',
        evaluation: 'Manual review suggested',
        checks: [
          { label: 'Multiple decline attempts', passed: false },
          { label: 'CVC match', passed: true }
        ]
      }
    },
    {
      id: '#ORD-2023-004',
      customer: { 
        name: 'Emma Watson', 
        email: 'emma.w@logistics.com', 
        avatar: 'https://i.pravatar.cc/100?img=9', 
        initials: 'EW', 
        bg: 'bg-pink-500',
        phone: '+44 20 7946 0958',
        customerSince: 'Dec 2023',
        billingAddress: '321 Logistics Square, London, SE1 0AA, UK'
      },
      manual: 'Volvo L120H Wheel Loader Shop Manual',
      manualType: 'PDF Download',
      amount: 2899,
      status: 'Success',
      date: 'Oct 23, 2023',
      time: '16:20 PM',
      placedOn: 'Oct 23, 2023 at 16:20 PM',
      paymentMethod: 'Apple Pay',
      paymentGateway: 'Stripe',
      items: [
        {
          id: 1,
          title: 'Volvo L120H Wheel Loader Shop Manual',
          category: 'Heavy Machinery',
          brand: 'Volvo',
          price: 2899.00,
          qty: 1,
          image: 'https://images.unsplash.com/photo-1542362567-b052c0235631?auto=format&fit=crop&q=80&w=200'
        }
      ],
      timeline: [
        { status: 'Order Completed', description: 'Receipt email sent to customer.', time: 'Oct 23, 16:21 PM', color: 'bg-green-500' },
        { status: 'Payment Processed', description: 'Charge successful via Apple Pay.', time: 'Oct 23, 16:20 PM', color: 'bg-blue-500' },
        { status: 'Order Created', description: 'Checkout initiated.', time: 'Oct 23, 16:20 PM', color: 'bg-gray-300' }
      ],
      fraudAnalysis: {
        risk: 'Low Risk',
        evaluation: 'Biometric verified (Apple Pay)',
        checks: [
          { label: 'Tokenized payment', passed: true },
          { label: 'Billing address match', passed: true }
        ]
      }
    },
  ];
