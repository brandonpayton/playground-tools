import React from 'react';
import type { Attributes } from './index';
import type { BlockEditProps } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	ToggleControl,
	SelectControl,
	TextareaControl,
	Panel,
	PanelBody,
	// @ts-ignore
	__experimentalInputControl as InputControl,
	// @ts-ignore
	__experimentalToggleGroupControl as ToggleGroupControl,
	// @ts-ignore
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import PlaygroundPreview from './components/playground-preview';
import './editor.scss';

export default function Edit({
	isSelected,
	setAttributes,
	attributes,
}: BlockEditProps<Attributes>) {
	const {
		codeEditor,
		codeEditorReadOnly,
		codeEditorSideBySide,
		codeEditorMultipleFiles,
		codeEditorMode,
		logInUser,
		landingPageUrl,
		createNewPost,
		createNewPostType,
		createNewPostTitle,
		createNewPostContent,
		redirectToPost,
		redirectToPostType,
		constants,
		blueprint,
		codeEditorErrorLog,
		blueprintUrl,
		configurationSource,
	} = attributes;

	return (
		<div {...useBlockProps()}>
			<PlaygroundPreview
				showAddNewFile={codeEditorMultipleFiles}
				showFileControls={isSelected}
				onStateChange={({ files }) => {
					setAttributes({
						files,
					});
				}}
				{...attributes}
			/>
			<InspectorControls>
				<Panel header="Settings">
					<PanelBody title="Code editor" initialOpen={true}>
						<ToggleControl
							label="Code editor"
							help={
								codeEditor
									? 'Code editor enabled.'
									: 'Code editor disabled.'
							}
							checked={codeEditor}
							onChange={() => {
								setAttributes({
									codeEditor: !codeEditor,
								});
							}}
						/>
						{codeEditor && (
							<>
								<ToggleControl
									label="Side by side"
									help={
										codeEditorSideBySide
											? 'Code editor is to the left.'
											: 'Code editor is at the top.'
									}
									checked={codeEditorSideBySide}
									onChange={() => {
										setAttributes({
											codeEditorSideBySide:
												!codeEditorSideBySide,
										});
									}}
								/>
								<ToggleControl
									label="Read only"
									help={
										codeEditorReadOnly
											? 'Code editor is read only.'
											: 'Code editor is editable.'
									}
									checked={codeEditorReadOnly}
									onChange={() => {
										setAttributes({
											codeEditorReadOnly:
												!codeEditorReadOnly,
										});
									}}
								/>
								<ToggleControl
									label="Multiple files"
									help={
										codeEditorMultipleFiles
											? 'Multiple files allowed.'
											: 'Single file allowed.'
									}
									checked={codeEditorMultipleFiles}
									onChange={() => {
										setAttributes({
											codeEditorMultipleFiles:
												!codeEditorMultipleFiles,
										});
									}}
								/>
								<ToggleControl
									label='Include "error_log" file'
									checked={codeEditorErrorLog}
									onChange={() => {
										setAttributes({
											codeEditorErrorLog:
												!codeEditorErrorLog,
										});
									}}
								/>
								<SelectControl
									help={
										<div>
											Decide how your code from the editor
											will be used inside the Playground
											WordPress installation.
											<ul>
												<li>
													<strong>Plugin</strong>: all
													the files will be placed in
													a separate plugin which will
													be automatically enabled in
													the Playground.
												</li>
												<li>
													<strong>
														Editor script
													</strong>
													: the code will be executed
													directly in the Gutenberg
													editor (using{' '}
													<code>
														<small>
															wp_add_inline_script
														</small>
													</code>{' '}
													with{' '}
													<code>
														<small>wp-block</small>
													</code>
													dependency)
												</li>
											</ul>
										</div>
									}
									label="Mode"
									options={[
										{
											disabled: true,
											label: 'Select an Option',
											value: '',
										},
										{
											label: 'Editor script',
											value: 'editor-script',
										},
										{
											label: 'Plugin',
											value: 'plugin',
										},
									]}
									value={codeEditorMode}
									onChange={(value) => {
										setAttributes({
											codeEditorMode: value,
										});
									}}
								/>
							</>
						)}
					</PanelBody>
					<PanelBody title="Blueprint" initialOpen={false}>
						<SelectControl
							label="Blueprint source"
							value={configurationSource}
							options={[
								{
									label: 'Generate from block attributes',
									value: 'block-attributes',
								},
								{
									label: 'URL',
									value: 'blueprint-url',
								},
								{
									label: 'JSON (paste it below)',
									value: 'blueprint-json',
								},
							]}
							onChange={(newConfigurationSource) => {
								setAttributes({
									configurationSource: newConfigurationSource,
								});
							}}
							help={
								'Playground is configured using Blueprints. Select the source ' +
								"of the Blueprint you'd like to use for this Playground instance."
							}
						/>
						{configurationSource === 'block-attributes' && (
							<>
								<ToggleControl
									label="Log in automatically"
									help={
										logInUser
											? 'User will be logged in.'
											: "User won't be logged in."
									}
									checked={logInUser}
									onChange={() => {
										setAttributes({
											logInUser: !logInUser,
										});
									}}
								/>
								<ToggleControl
									label="Create new post or page"
									help={
										createNewPost
											? 'New post or page will be created.'
											: 'No new posts or pages will be created.'
									}
									checked={createNewPost}
									onChange={() => {
										setAttributes({
											createNewPost: !createNewPost,
										});
									}}
								/>
								{createNewPost && (
									<>
										<ToggleGroupControl
											label="Create new: post type"
											value={createNewPostType}
											onChange={(value: any) => {
												setAttributes({
													createNewPostType:
														value?.toString(),
												});
											}}
											isBlock
										>
											<ToggleGroupControlOption
												value="post"
												label="Post"
											/>
											<ToggleGroupControlOption
												value="page"
												label="Page"
											/>
										</ToggleGroupControl>
										<InputControl
											value={createNewPostTitle}
											onChange={(value: any) => {
												setAttributes({
													createNewPostTitle: value,
												});
											}}
											label="Create new: title"
											placeholder="Hello World!"
										/>
										<TextareaControl
											value={createNewPostContent}
											onChange={(value) => {
												setAttributes({
													createNewPostContent: value,
												});
											}}
											label="Create new: content"
											help="Gutenberg editor content of the post"
										/>
										<ToggleControl
											label="Create new: redirect to post"
											help={
												redirectToPost
													? 'User will be redirected.'
													: "User won't be redirected."
											}
											checked={redirectToPost}
											onChange={() => {
												setAttributes({
													redirectToPost:
														!redirectToPost,
												});
											}}
										/>
										{redirectToPost && (
											<ToggleGroupControl
												label="Create new redirect: redirect to"
												value={redirectToPostType}
												onChange={(value: any) => {
													setAttributes({
														redirectToPostType:
															value?.toString(),
													});
												}}
												isBlock
											>
												<ToggleGroupControlOption
													value="front"
													label="Front page"
												/>
												<ToggleGroupControlOption
													value="admin"
													label="Edit screen"
												/>
											</ToggleGroupControl>
										)}
									</>
								)}
								{(!createNewPost || !redirectToPost) && (
									<InputControl
										value={landingPageUrl}
										onChange={(value: any) => {
											setAttributes({
												landingPageUrl: value,
											});
										}}
										label="Landing page"
										help="Define where to redirect after Playground is loaded."
										placeholder="URL to redirect to after load (eg. /wp-admin/)"
									/>
								)}
								{['WP_DEBUG', 'WP_SCRIPT_DEBUG'].map(
									(constName) => (
										<ToggleControl
											key={constName}
											label={constName}
											help={
												constants[constName]
													? `${constName}=true`
													: `${constName}=false`
											}
											checked={!!constants[constName]}
											onChange={() => {
												setAttributes({
													constants: {
														...constants,
														[constName]:
															!constants[
																constName
															],
													},
												});
											}}
										/>
									)
								)}
							</>
						)}
						{configurationSource === 'blueprint-url' && (
							<InputControl
								value={blueprintUrl}
								onChange={(value: any) => {
									setAttributes({
										blueprintUrl: value,
									});
								}}
								label="Blueprint URL"
								help="Load Blueprint from this URL."
								placeholder="URL to load the Blueprint from"
							/>
						)}
						{configurationSource === 'blueprint-json' && (
							<TextareaControl
								value={blueprint}
								onChange={(value) => {
									setAttributes({
										blueprint: value,
									});
								}}
								label="Blueprint"
								help="JSON file with playground blueprint"
							/>
						)}
					</PanelBody>
				</Panel>
			</InspectorControls>
		</div>
	);
}
