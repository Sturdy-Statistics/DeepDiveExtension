# Sturdy Statistics Deep Dive Extension

The Sturdy Statistics Deep Dive extension enables you to integrate directly with the Sturdy Statistics [Deep Dive Search](https://sturdystatistics.com/deepdive-search) in your current browser workflow.
When you make a Google search, you can kick off a **Deep Dive**. 
Sturdy Statistics will index the top 300 google results and organize the content.
When you view a research paper, you can kick off a **Citation Network Deep Dive**. 
Sturdy Statistics will download the metadata of every paper that cites or is cited by the paper you are viewing, and organize all of the papers by content.

# Privacy

The extension does store any data or any identifying information. 
The extension is only activated at the following [domains](https://github.com/Sturdy-Statistics/DeepDiveExtension/blob/main/extension/manifest.json#L11-L21).
The only data we access at those sites is your current URL so we can construct a link to a relevant Deep Dive. Read our [Privacy Policy](privacy_policy.md) for a more in-depth explanation.


# Integrations

### Google
The Google Deep Dive integrates directly with your browser. It loads the content of the top 300 links and organizes them for research and rapid perusal.

### Academic
The Citation Network Deep Dive will download the metadata of every paper that cites or is cited by the paper you are viewing, and organize all of the papers by content.
The Deep Dive can be kicked off anytime you view a research paper from
* [arXiv](https://arxiv.org/)
* [pubmed](https://pubmed.ncbi.nlm.nih.gov/)
* [doi](https://doi.org/)
* [Semantic Scholar](https://www.semanticscholar.org/)


