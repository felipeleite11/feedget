import { SubmitFeedbackUseCase } from "./submit-feedback"

const createFeedbackSpy = jest.fn()
const listFeedbackSpy = jest.fn()
const sendEmailSpy = jest.fn()

const submitFeedack = new SubmitFeedbackUseCase(
	{ 
		create: createFeedbackSpy,
		list: listFeedbackSpy
	},
	{ sendMail: sendEmailSpy }
)

describe('Submit feedback', () => {
	it('should be able to submit a feedback', async () => {
		const result = submitFeedack.execute({
			type: 'BUG',
			comment: 'Example comment...',
			screenshot: 'data:image/png;base64_print.jpg'
		})
		
		await expect(result).resolves.not.toThrow()

		expect(createFeedbackSpy).toHaveBeenCalled()
		expect(sendEmailSpy).toHaveBeenCalled()
	})

	it('should be able to submit a feedback from mobile device', async () => {
		const result = submitFeedack.execute({
			type: 'BUG',
			comment: 'Example comment...',
			screenshot: 'data:image/png;base64_print.jpg',
			device: 'mobile'
		})
		
		await expect(result).resolves.not.toThrow()

		expect(createFeedbackSpy).toHaveBeenCalled()
		expect(sendEmailSpy).toHaveBeenCalled()
	})

	it('should be able to submit a feedback without screenshot', async () => {
		const result = submitFeedack.execute({
			type: 'BUG',
			comment: 'Example comment...'
		})
		
		await expect(result).resolves.not.toThrow()

		expect(createFeedbackSpy).toHaveBeenCalled()
		expect(sendEmailSpy).toHaveBeenCalled()
	})

	it('should not be able to submit a feedback with an invalid screeshot', async () => {
		const result = submitFeedack.execute({
			type: 'BUG',
			comment: 'Example comment...',
			screenshot: 'print.jpg'
		})
		
		await expect(result).rejects.toThrow()
	})

	it('should not be able to submit a feedback without type', async () => {
		const result = submitFeedack.execute({
			type: '',
			comment: 'Example comment...',
			screenshot: 'data:image/png;base64print.jpg'
		})
		
		await expect(result).rejects.toThrow()
	})

	it('should not be able to submit a feedback without comment', async () => {
		const result = submitFeedack.execute({
			type: 'IDEA',
			comment: '',
			screenshot: 'data:image/png;base64print.jpg'
		})
		
		await expect(result).rejects.toThrow()
	})
})
