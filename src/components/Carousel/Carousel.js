import React from 'react';
import { Animated, FlatList, Text, View, Platform } from 'react-native';

//components
import CarouselItem from './CarouselItem';

//styles
import { styles } from './CarouselStyle';

//global
import { Constants, } from "../../global/index";
import Dots from './Dots';

const Carousel = ({
	data
}) => {

	const isAndroid = Platform.OS === 'android';

	React.useEffect(() => {
		startAutoScroll();
		return () => {
			isAutoScrolling.current = true;
			activeIndex.current = 0;
			clearInterval(interval.current);
		};
	}, []);

	//refs
	const scrollX = React.useRef(new Animated.Value(0)).current;
	const interval = React.useRef(0);
	const activeIndex = React.useRef(0);
	const ref = React.useRef(null);
	const isAutoScrolling = React.useRef(true);

	const bottomRef = React.useRef(null);

	const renderItem = ({ item }) => <CarouselItem item={item} />;

	const handleOnMomentumScrollEnd = ({ nativeEvent }) => {
		if (!isAutoScrolling.current) {
			const index = Math.floor(nativeEvent.contentOffset.x / Constants.WIDTH);
			activeIndex.current = index;
			bottomRef?.current?.scrollToIndex({ animated: true, index: activeIndex.current, viewPosition: 0.5 })
			startAutoScroll();
		}
	};

	const startAutoScroll = () => {
		interval.current = setInterval(() => {

			if (data.length > 0) {
				isAutoScrolling.current = true;
				activeIndex.current += 1;
				if (activeIndex.current > data.length - 1) {
					activeIndex.current = 0;
				}
				ref?.current?.scrollToIndex({ animated: true, index: activeIndex.current, viewPosition: 0.5 });
				bottomRef?.current?.scrollToIndex({ animated: true, index: activeIndex.current, viewPosition: 0.5 })
				if (isAndroid) {
				}
			}

		}, 5000);
	};

	const stopAutoScroll = () => {
		isAutoScrolling.current = false;
		clearInterval(interval.current);
	};

	return (
		<View style={styles.con}>
			<Animated.FlatList
				ref={ref}
				onScrollBeginDrag={stopAutoScroll}
				disableIntervalMomentum={true}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
				contentContainerStyle={styles.contentContainerStyle}
				data={data}
				renderItem={renderItem}
				bounces={false}
				horizontal={true}
				keyExtractor={item => item?.id?.toString()}
				decelerationRate={0.6}
				snapToInterval={Constants.WIDTH}
				onMomentumScrollEnd={handleOnMomentumScrollEnd}
				showsHorizontalScrollIndicator={false}
			/>

			{/* render dots */}
			{
				data.length == 1
					?
					null
					:
					<View style={styles.dotsCon}>
						<FlatList
							showsHorizontalScrollIndicator={false}
							horizontal={true}
							style={data.length >= 5 ? styles.dotsFlatList : {}}
							ref={bottomRef}
							data={data}
							renderItem={({ item, index }) => <Dots scrollX={scrollX} index={index} />}
							keyExtractor={(_, index) => index.toString()}
						/>
					</View>
			}

		</View>
	);
};

export default React.memo(Carousel);