import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useMemo
} from 'react'

import styles from './HighlightedText.module.css'

export const HighlightedContext = createContext<string>('')

export const HighlightedText: FC<PropsWithChildren> = ({ children }) => {
	if (typeof children !== 'string') return children

	return <HighlightedTextInternal>{children}</HighlightedTextInternal>
}

interface IHighlightedTextProps {
	children: string
}

const HighlightedTextInternal: FC<IHighlightedTextProps> = ({ children }) => {
	const query = useContext(HighlightedContext)
	const markup = useMemo(() => {
		if (!query) return { __html: children }

		return {
			__html: children.replaceAll(
				new RegExp(query.split(/\W/).join('|'), 'gi'),
				`<span class="${styles.highlighted}">$&</span>`
			)
		}
	}, [children, query])

	return <span dangerouslySetInnerHTML={markup} />
}
