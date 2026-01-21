import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	OptionType,
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type Props = {
	articleState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ articleState, onApply }: Props) => {
	const [draftState, setDraftState] = useState(articleState);

	const updateArticleState = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setDraftState((prev) => ({ ...prev, [key]: value }));
	};

	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						onApply(draftState);
					}}>
					<Text
						as='h2'
						size={31}
						weight={800}
						uppercase
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={draftState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value: OptionType) => {
							updateArticleState('fontFamilyOption', value);
						}}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						selected={draftState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(value: OptionType) => {
							updateArticleState('fontSizeOption', value);
						}}
					/>
					<Select
						title='Цвет шрифта'
						selected={draftState.fontColor}
						options={fontColors}
						onChange={(value: OptionType) => {
							updateArticleState('fontColor', value);
						}}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={draftState.backgroundColor}
						options={backgroundColors}
						onChange={(value: OptionType) => {
							updateArticleState('backgroundColor', value);
						}}
					/>
					<Select
						title='Ширина контента'
						selected={draftState.contentWidth}
						options={contentWidthArr}
						onChange={(value: OptionType) => {
							updateArticleState('contentWidth', value);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								onApply(defaultArticleState);
								setDraftState(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() => {
								onApply(draftState);
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
