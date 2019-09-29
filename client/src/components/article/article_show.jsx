import React from 'react'
import { DonutGraph } from './charts/donut_graph';
import RadarChart  from './charts/radar';
import WikiSearchContainer from '../search/search_container';

export class ArticleShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articleUrl: props.location.articleUrl,
            articleTitle: props.location.articleTitle
        }
    }

    render() {
        return (
            <div className="article-show-page-container">
                <WikiSearchContainer />
                <div className="article-show-charts">
                    <RadarChart />
                    <DonutGraph
                        articleTitle={this.props.articleTitle}
                        articleUrl={this.state.articleUrl}/>
                </div>
            </div>
        )
    }
}
