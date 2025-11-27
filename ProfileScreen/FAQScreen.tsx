// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Dimensions,
// } from 'react-native';

// const { width, height } = Dimensions.get('window');

// // Example FAQ items
// const faqItems = [
//  {
//       id: 1,
//       title: 'Earnings & Payments',
//       icon: require('./assets/earnings.png'),
//       content: 'Information about earnings and payment methods...',
//     },
//     {
//       id: 2,
//       title: 'Car Safety',
//       icon: require('./assets/car-safety.png'),
//       content: 'Safety guidelines and insurance information...',
//     },
//     {
//       id: 3,
//       title: 'Car Sharing Convenience',
//       icon: require('./assets/car-sharing.png'),
//       content: 'How car sharing works and convenience features...',
//     },
//     {
//       id: 4,
//       title: 'Policies',
//       icon: require('./assets/policy.png'),
//       content: 'Terms of service and usage policies...',
//     },
// ];

// export default function FAQScreen() {
//   const [expandedItem, setExpandedItem] = useState(null);

//   const toggleItem = (id) => {
//     setExpandedItem(expandedItem === id ? null : id);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.headerText}>HAVE OTHER QUERIES?</Text>

//       {faqItems.map((item) => (
//         <View key={item.id} style={styles.card}>
//           <TouchableOpacity
//             style={styles.accordionItem}
//             onPress={() => toggleItem(item.id)}
//             activeOpacity={0.8}
//           >
//             <View style={styles.itemLeft}>
//               <View style={styles.iconContainer}>
//                 <Image source={item.icon} style={styles.icon} resizeMode="contain" />
//               </View>
//               <Text style={styles.itemTitle}>{item.title}</Text>
//             </View>
//             <Image
//               source={require('./assets/down-arrow.png')}
//               style={[
//                 styles.chevron,
//                 expandedItem === item.id && { transform: [{ rotate: '180deg' }] },
//               ]}
//             />
//           </TouchableOpacity>

//           {expandedItem === item.id && (
//             <View style={styles.expandedContent}>
//               <Text style={styles.contentText}>{item.content}</Text>
//             </View>
//           )}
//         </View>
//       ))}

//       <TouchableOpacity style={styles.questionsLink} activeOpacity={0.7}>
//         <Text style={styles.questionsLinkText}>STILL HAVE QUESTIONS</Text>
//         <Image
//           source={require('./assets/right-arrow.png')}
//           style={styles.chevronRight}
//           resizeMode="contain"
//         />
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: width * 0.05,
//     paddingVertical: height * 0.03,
//     backgroundColor: '#F8FAFC',
//   },
//   headerText: {
//     fontSize: width * 0.05,
//     fontWeight: '700',
//     color: '#1F2937',
//     marginBottom: height * 0.02,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     marginBottom: height * 0.02,
//     overflow: 'hidden',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   accordionItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: width * 0.04,
//   },
//   itemLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconContainer: {
//     width: width * 0.08,
//     height: width * 0.08,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: width * 0.03,
//   },
//   icon: {
//     width: '100%',
//     height: '100%',
//   },
//   itemTitle: {
//     fontSize: width * 0.045,
//     fontWeight: '600',
//     color: '#111827',
//     flexShrink: 1,
//   },
//   chevron: {
//     width: width * 0.05,
//     height: width * 0.05,
//   },
//   expandedContent: {
//     paddingHorizontal: width * 0.04,
//     paddingBottom: height * 0.02,
//   },
//   contentText: {
//     fontSize: width * 0.04,
//     color: '#4B5563',
//     lineHeight: 20,
//   },
//   questionsLink: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: height * 0.02,
//   },
//   questionsLinkText: {
//     fontSize: width * 0.045,
//     fontWeight: '700',
//     color: '#3B82F6',
//     marginRight: width * 0.02,
//   },
//   chevronRight: {
//     width: width * 0.04,
//     height: width * 0.04,
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { normalize, normalizeFont, normalizeIcon, normalizeSpacing } from '../utils/normalize';

// Example FAQ items
const faqItems = [
  {
    id: 1,
    title: 'Earnings & Payments',
    icon: require('./assets/earnings.png'),
    content: 'Information about earnings and payment methods...',
  },
  {
    id: 2,
    title: 'Car Safety',
    icon: require('./assets/car-safety.png'),
    content: 'Safety guidelines and insurance information...',
  },
  {
    id: 3,
    title: 'Car Sharing Convenience',
    icon: require('./assets/car-sharing.png'),
    content: 'How car sharing works and convenience features...',
  },
  {
    id: 4,
    title: 'Policies',
    icon: require('./assets/policy.png'),
    content: 'Terms of service and usage policies...',
  },
];

export default function FAQScreen() {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>


      {faqItems.map((item) => (
        <View key={item.id} style={styles.card}>
          <TouchableOpacity
            style={styles.accordionItem}
            onPress={() => toggleItem(item.id)}
            activeOpacity={0.8}
          >
            <View style={styles.itemLeft}>
              <View style={styles.iconContainer}>
                <Image source={item.icon} style={styles.icon} resizeMode="contain" />
              </View>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>

            <Image
              source={require('./assets/down-arrow.png')}
              style={[
                styles.chevron,
                expandedItem === item.id && { transform: [{ rotate: '180deg' }] },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {expandedItem === item.id && (
            <View style={styles.expandedContent}>
              <Text style={styles.contentText}>{item.content}</Text>
            </View>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.questionsLink} activeOpacity={0.7}>
        <Text style={styles.questionsLinkText}>STILL HAVE QUESTIONS</Text>
        <Image
          source={require('./assets/right-arrow.png')}
          style={styles.chevronRight}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalizeSpacing(20),
    paddingVertical: normalizeSpacing(24),
    backgroundColor: '#F8FAFC',
  },
  headerText: {
    fontSize: normalizeFont(20),
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: normalizeSpacing(20),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalizeSpacing(12),
    marginBottom: normalizeSpacing(16),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  accordionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: normalizeSpacing(14),
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: normalizeIcon(28),
    height: normalizeIcon(28),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalizeSpacing(10),
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  itemTitle: {
    fontSize: normalizeFont(16),
    fontWeight: '200',
    color: '#111827',
    flexShrink: 1,
  },
  chevron: {
    width: normalizeIcon(16),
    height: normalizeIcon(16),
  },
  expandedContent: {
    paddingHorizontal: normalizeSpacing(14),
    paddingBottom: normalizeSpacing(14),
  },
  contentText: {
    fontSize: normalizeFont(14),
    color: '#4B5563',
    lineHeight: normalizeFont(20),
  },
  questionsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalizeSpacing(20),
  },
  questionsLinkText: {
    fontSize: normalizeFont(16),
    fontWeight: '700',
    color: '#3B82F6',
    marginRight: normalizeSpacing(6),
  },
  chevronRight: {
    width: normalizeIcon(14),
    height: normalizeIcon(14),
  },
});
